using System.Collections.Generic;
using System.Threading.Tasks;
using posmn_coin_info.Models;

namespace posmn_coin_info
{
  public interface ICurrenciesRetriever
  {
    Task<IEnumerable<CurrencyStats>> Get();
  }
}