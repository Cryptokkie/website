using Microsoft.Extensions.Logging;
using posmn_coin_info.Models;
using posmn_coin_info.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace posmn_coin_info
{
  public class CurrenciesRetriever : ICurrenciesRetriever
  {
    private readonly ICachingService cachingService;
    private readonly ICoinExplorerService explorerService;
    private readonly ILogger log;

    public CurrenciesRetriever(
      ILogger<CurrenciesFunction> log,
      ICachingService cachingService,
      ICoinExplorerService explorerService)
    {
      this.log = log;
      this.cachingService = cachingService;
      this.explorerService = explorerService;
    }

    public async Task<IEnumerable<CurrencyStats>> Get()
    {
      var currencies = cachingService.GetCurrencies();
      if (currencies != null)
      {
        log.LogInformation("Retrieved currencies from cache");
      }
      else
      {
        currencies = await explorerService.GetCurrencies();
        cachingService.StoreCurrencies(currencies);
        log.LogInformation("Retrieved currencies from explorer and stored in cache");
      }
      return currencies;
    }
  }
}
