using posmn_coin_info.Models;
using System;
using System.Collections.Generic;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;

namespace posmn_coin_info.Services
{
  public class CachingService
  {
    private static readonly MemoryCache memoryCache = MemoryCache.Default;
    private const string CurrenciesCacheKey = "currencies";

    public IEnumerable<CurrencyStats> GetCurrencies()
    {
      CacheItem cacheContents = memoryCache.GetCacheItem(CurrenciesCacheKey);
      return cacheContents?.Value as IEnumerable<CurrencyStats>;
    }

    public void StoreCurrencies(IEnumerable<CurrencyStats> currencies)
    {
      CacheItem cacheContents = memoryCache.GetCacheItem(CurrenciesCacheKey);
      CacheItemPolicy policy = new CacheItemPolicy
      {
        Priority = CacheItemPriority.Default,
        AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(30)
      };
      cacheContents = new CacheItem(CurrenciesCacheKey, currencies);
      memoryCache.Set(cacheContents, policy);
    }
  }
}
