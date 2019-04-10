using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Posmn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace posmn_coin_info.Services
{
  public class CoinDataTableStorage : ICoinDataTableStorage
  {
    CloudTableClient tableClient;
    CloudTable coinsTable;
    
    public CoinDataTableStorage()
    {
      CloudStorageAccount storageAccount = CloudStorageAccount.Parse(Environment.GetEnvironmentVariable("CoinDataStorage"));

      this.tableClient = storageAccount.CreateCloudTableClient();
      this.coinsTable = tableClient.GetTableReference("coins");
    }

    public async Task AddCoin(Coin coin)
    {
      var flattenedObject = EntityPropertyConverter.Flatten(coin, new OperationContext());
      var tableEntity = new DynamicTableEntity("coin", coin.Id);
      tableEntity.Properties = flattenedObject;

      TableOperation insertOperation = TableOperation.InsertOrReplace(tableEntity);

      await this.coinsTable.ExecuteAsync(insertOperation);
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
  }
}
