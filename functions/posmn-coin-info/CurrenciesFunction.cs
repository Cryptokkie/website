using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Posmn.CoinData.Services;
using System.Collections.Generic;
using Posmn.CoinData.Models;
using AutoMapper;

namespace posmn_coin_info
{
  public class CoinsFunction
  {
    private readonly ICoinDataTableStorage coinDataTableStorage;
    private readonly IMapper mapper;

    public CoinsFunction(ICoinDataTableStorage coinDataTableStorage, IMapper mapper)
    {
      this.coinDataTableStorage = coinDataTableStorage;
      this.mapper = mapper;
    }

    [FunctionName("coins")]
    public async Task<IActionResult> Coins(
      [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
      ILogger log)
    {
      log.LogInformation("Coins function processed a request.");

      var coins = await coinDataTableStorage.GetCoins();
      var basicCoins = mapper.Map<IEnumerable<BasicCoinData>>(coins);

      return new OkObjectResult(basicCoins);
    }

    [FunctionName("coin")]
    public async Task<IActionResult> Coin(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
      log.LogInformation("Coin function processed a request.");

      string coinId = req.Query["coinId"];

      if (coinId == null)
      {
        return new BadRequestObjectResult("Please pass a coinId on the query string");
      }

      var coinResponse = await coinDataTableStorage.GetCoin(coinId);

      return new OkObjectResult(coinResponse);
    }
  }
}
