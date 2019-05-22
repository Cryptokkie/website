using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Posmn.RatingData.Services
{
  using Models;

  public class RatingDataTableStorage : IRatingDataTableStorage
  {
    CloudTableClient tableClient;
    CloudTable ratingsTable;

    public RatingDataTableStorage()
    {
      CloudStorageAccount storageAccount = CloudStorageAccount.Parse(Environment.GetEnvironmentVariable("RatingDataStorage"));

      this.tableClient = storageAccount.CreateCloudTableClient();
      this.ratingsTable = tableClient.GetTableReference("ratings");
    }

    public async Task Init()
    {
      await CreateRatingsTableIfNotExists();
    }
    
    private async Task CreateRatingsTableIfNotExists()
    {
      await ratingsTable.CreateIfNotExistsAsync();
    }
    
    public async Task AddOrUpdateRating(Rating rating)
    {
      var flattenedObject = EntityPropertyConverter.Flatten(rating, new OperationContext());
      var tableEntity = new DynamicTableEntity(rating.CoinId, rating.UserId);
      tableEntity.Properties = flattenedObject;

      TableOperation insertOperation = TableOperation.InsertOrReplace(tableEntity);

      await this.ratingsTable.ExecuteAsync(insertOperation);
    }

    public async Task<IEnumerable<Rating>> GetRatings(string coinId)
    {
      TableContinuationToken token = null;
      var list = new List<Rating>();
      var query = new TableQuery<DynamicTableEntity>();
      query.FilterString = $"PartitionKey eq '{coinId}'";

      do
      {
        var queryResult = await this.ratingsTable.ExecuteQuerySegmentedAsync(query, token);
        list.AddRange(queryResult.Results.Select(x => EntityPropertyConverter.ConvertBack<Rating>(x.Properties, new OperationContext())));
        token = queryResult.ContinuationToken;
      } while (token != null);

      return list;
    }

    public async Task<Rating> GetRating(string coinId, string userId)
    {
      TableOperation getOperation = TableOperation.Retrieve<DynamicTableEntity>(coinId, userId);
      var result = await this.ratingsTable.ExecuteAsync(getOperation);

      var tableEntity = result.Result as DynamicTableEntity;
      return tableEntity == null ? null : EntityPropertyConverter.ConvertBack<Rating>(tableEntity.Properties, new OperationContext());
    }
  }
}
