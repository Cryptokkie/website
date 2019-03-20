using System.Collections.Generic;
using posmn_coin_info.Models;

namespace posmn_coin_info.Services
{
  public interface ICachingService
  {
    IEnumerable<CurrencyStats> GetCurrencies();
    void StoreCurrencies(IEnumerable<CurrencyStats> currencies);
  }
}