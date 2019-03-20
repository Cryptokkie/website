using System.Collections.Generic;
using System.Threading.Tasks;
using posmn_coin_info.Models;

namespace posmn_coin_info.Services
{
  public interface ICoinExplorerService
  {
    Task<IEnumerable<CurrencyStats>> GetCurrencies();
    Task<CurrencyStats> GetCurrency(string currencyName);
  }
}