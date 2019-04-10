using coingecko_importer.Models;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace coingecko_importer.Services
{
  public class CoinDataTableStorage : ICoinDataTableStorage
  {
    CloudTableClient tableClient;
    CloudTable coinsTable;
    CloudTable supportedCoinsTable;
    
    public CoinDataTableStorage()
    {
      CloudStorageAccount storageAccount = CloudStorageAccount.Parse(Environment.GetEnvironmentVariable("CoinDataStorage"));

      this.tableClient = storageAccount.CreateCloudTableClient();
      this.coinsTable = tableClient.GetTableReference("coins");
      this.supportedCoinsTable = tableClient.GetTableReference("supportedcoins");
    }

    public async Task Init()
    {
      await Task.WhenAll(
        CreateCoinsTableIfNotExists(),
        CreateSupportedCoinsTableIfNotExists());
    }

    private async Task CreateCoinsTableIfNotExists()
    {
      await coinsTable.CreateIfNotExistsAsync();
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

    public async Task AddCoin(CoinEntity coin)
    {
      TableOperation insertOperation = TableOperation.InsertOrMerge(coin);

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
  }
}
