using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Posmn.CoinData.Services;

namespace posmn_coin_info
{
  public class CurrenciesFunction
  {
    private readonly ICoinDataTableStorage coinDataTableStorage;

    public CurrenciesFunction(ICoinDataTableStorage coinDataTableStorage)
    {
      this.coinDataTableStorage = coinDataTableStorage;
    }

    [FunctionName("currencies")]
    public async Task<IActionResult> Run(
      [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
      ILogger log)
    {
      log.LogInformation("Currencies function processed a request.");

      var currenciesResponse = await coinDataTableStorage.GetCoins();

      return new OkObjectResult(currenciesResponse);
    }
  }
}
