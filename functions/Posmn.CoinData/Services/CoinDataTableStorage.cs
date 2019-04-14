using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Posmn.CoinData.Services
{
  using Models;

  public class CoinDataTableStorage : ICoinDataTableStorage
  {
    CloudTableClient tableClient;
    CloudTable coinsTable;
    CloudTable masternodeStatsTable;
    CloudTable supportedCoinsTable;
    CloudTable dataPointsTable;

    public CoinDataTableStorage()
    {
      CloudStorageAccount storageAccount = CloudStorageAccount.Parse(Environment.GetEnvironmentVariable("CoinDataStorage"));

      this.tableClient = storageAccount.CreateCloudTableClient();
      this.coinsTable = tableClient.GetTableReference("coins");
      this.masternodeStatsTable = tableClient.GetTableReference("masternodestats");
      this.supportedCoinsTable = tableClient.GetTableReference("supportedcoins");
      this.dataPointsTable = tableClient.GetTableReference("datapoints");
    }

    public async Task Init()
    {
      await Task.WhenAll(
        CreateCoinsTableIfNotExists(),
        CreateMasternodeStatsTableIfNotExists(),
        CreateDataPointsTableIfNotExists(),
        CreateSupportedCoinsTableIfNotExists());
    }

    private async Task CreateCoinsTableIfNotExists()
    {
      await coinsTable.CreateIfNotExistsAsync();
    }

    private async Task CreateDataPointsTableIfNotExists()
    {
      await dataPointsTable.CreateIfNotExistsAsync();
    }

    private async Task CreateMasternodeStatsTableIfNotExists()
    {
      await masternodeStatsTable.CreateIfNotExistsAsync();
    }

    private async Task CreateSupportedCoinsTableIfNotExists()
    {
      if (await supportedCoinsTable.CreateIfNotExistsAsync())
      {
        // table is newly created, insert some data here
        string[] supportedCoins = {
          "monkey-project",
          "zest",
          "bitcoin-green",
          "blocknode",
          "deviantcoin",
          "mastercoin",
          "smartcash"
        };

        var insertOperation = new TableBatchOperation();
        foreach (var supportedCoin in supportedCoins)
        {
          insertOperation.Insert(new TableEntity("supportedcoin", supportedCoin));
        }

        await supportedCoinsTable.ExecuteBatchAsync(insertOperation);
      }
    }

    public async Task AddCoin(Coin coin)
    {
      var flattenedObject = EntityPropertyConverter.Flatten(coin, new OperationContext());
      var tableEntity = new DynamicTableEntity("coin", coin.Id);
      tableEntity.Properties = flattenedObject;

      TableOperation insertOperation = TableOperation.InsertOrReplace(tableEntity);

      await this.coinsTable.ExecuteAsync(insertOperation);
    }

    public async Task<IEnumerable<string>> GetSupportedCoins()
    {
      TableContinuationToken token = null;
      var list = new List<string>();

      do
      {
        var queryResult = await this.supportedCoinsTable.ExecuteQuerySegmentedAsync(new TableQuery<TableEntity>(), token);
        list.AddRange(queryResult.Results.Select(x => x.RowKey));
        token = queryResult.ContinuationToken;
      } while (token != null);

      return list;
    }

    public async Task<IEnumerable<Coin>> GetCoins()
    {
      TableContinuationToken token = null;
      var list = new List<Coin>();

      do
      {
        var queryResult = await this.coinsTable.ExecuteQuerySegmentedAsync(new TableQuery<DynamicTableEntity>(), token);
        list.AddRange(queryResult.Results.Select(x => EntityPropertyConverter.ConvertBack<Coin>(x.Properties, new OperationContext())));
        token = queryResult.ContinuationToken;
      } while (token != null);

      return list;
    }

    public async Task AddMasternodeStats(MasternodeStats masternodeStats)
    {
      var flattenedObject = EntityPropertyConverter.Flatten(masternodeStats, new OperationContext());
      var tableEntity = new DynamicTableEntity("coin", masternodeStats.CoinId);
      tableEntity.Properties = flattenedObject;

      TableOperation insertOperation = TableOperation.InsertOrReplace(tableEntity);

      await this.masternodeStatsTable.ExecuteAsync(insertOperation);
    }

    public async Task<MasternodeStats> GetMasternodeStats(string coinId)
    {
      TableOperation getOperation = TableOperation.Retrieve<DynamicTableEntity>("coin", coinId);
      var result = await this.masternodeStatsTable.ExecuteAsync(getOperation);

      var tableEntity = result.Result as DynamicTableEntity;
      return EntityPropertyConverter.ConvertBack<MasternodeStats>(tableEntity.Properties, new OperationContext());
    }


    public async Task AddDataPoint(DataPoint dataPoint)
    {
      var flattenedObject = EntityPropertyConverter.Flatten(dataPoint, new OperationContext());
      var tableEntity = new DynamicTableEntity(dataPoint.CoinId, DateTime.UtcNow.ToString("yyyyMMdd"));
      tableEntity.Properties = flattenedObject;

      TableOperation insertOperation = TableOperation.InsertOrReplace(tableEntity);

      await this.dataPointsTable.ExecuteAsync(insertOperation);
    }

    public async Task<IEnumerable<DataPoint>> GetDataPoints(string coinId)
    {
      TableContinuationToken token = null;
      var list = new List<DataPoint>();
      var query = new TableQuery<DynamicTableEntity>();
      query.FilterString = $"PartitionKey eq '{coinId}'";

      do
      {
        var queryResult = await this.dataPointsTable.ExecuteQuerySegmentedAsync(query, token);
        list.AddRange(queryResult.Results.Select(x => EntityPropertyConverter.ConvertBack<DataPoint>(x.Properties, new OperationContext())));
        token = queryResult.ContinuationToken;
      } while (token != null);

      return list;
    }
  }
}
