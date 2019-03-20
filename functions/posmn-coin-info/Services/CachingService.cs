using Microsoft.Extensions.Caching.Memory;
using posmn_coin_info.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace posmn_coin_info.Services
{
  public class CachingService
  {
    private static readonly MemoryCache memoryCache = new MemoryCache(new MemoryCacheOptions());
    private const string CurrenciesCacheKey = "currencies";

    public IEnumerable<CurrencyStats> GetCurrencies()
    {
      return memoryCache.Get<IEnumerable<CurrencyStats>>(CurrenciesCacheKey);
    }

    public void StoreCurrencies(IEnumerable<CurrencyStats> currencies)
    {
      memoryCache.Set(CurrenciesCacheKey, currencies, DateTimeOffset.Now.AddMinutes(30));
    }
  }
}
