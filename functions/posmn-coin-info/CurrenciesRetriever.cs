using Microsoft.Extensions.Logging;
using Posmn.Models;
using posmn_coin_info.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace posmn_coin_info
{
  public class CurrenciesRetriever : ICurrenciesRetriever
  {
    private readonly ICoinDataTableStorage coinDataTableStorage;
    private readonly ILogger log;

    public CurrenciesRetriever(
      ILoggerFactory loggerFactory,
      ICoinDataTableStorage coinDataTableStorage)
    {
      this.log = loggerFactory.CreateLogger(Constants.FUNCTION_LOG_KEY);
      this.coinDataTableStorage = coinDataTableStorage;
    }

    public async Task<IEnumerable<Coin>> Get()
    {
      return await coinDataTableStorage.GetCoins();
    }
  }
}
