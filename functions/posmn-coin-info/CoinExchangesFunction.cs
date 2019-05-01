using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Posmn.CoinData.Services;

namespace posmn_coin_info
{
  public class CoinExchangesFunction
  {
    private readonly ICoinDataTableStorage coinDataTableStorage;

    public CoinExchangesFunction(ICoinDataTableStorage coinDataTableStorage)
    {
      this.coinDataTableStorage = coinDataTableStorage;
    }

    [FunctionName("coin-exchanges")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
      log.LogInformation("Coin-exchanges function processed a request.");

      string coinId = req.Query["coinId"];

      if (coinId == null)
      {
        return new BadRequestObjectResult("Please pass a coinId on the query string");
      }
        
      var coinExchanges = await coinDataTableStorage.GetCoinExchanges(coinId);

      return new OkObjectResult(coinExchanges);
    }
  }
}
