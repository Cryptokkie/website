using Microsoft.Build.Framework;
using posmn_coin_info.Models;
using posmn_coin_info.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace posmn_coin_info
{
  public class CurrenciesRetriever
  {
    private static readonly CachingService cachingService = new CachingService();
    private static readonly CoinExplorerService explorerService = new CoinExplorerService();

    public async Task<IEnumerable<CurrencyStats>> Get()
    {
      var currencies = cachingService.GetCurrencies();
      if (currencies != null)
      {
        // log cache retrieval
      }
      else
      {
        currencies = await explorerService.GetCurrencies();
        cachingService.StoreCurrencies(currencies);
        // log fresh retrieval
      }
      return currencies;
    }
  }
}
