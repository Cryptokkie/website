using System.Collections.Generic;
using System.Threading.Tasks;
using Posmn.Models;

namespace posmn_coin_info
{
  public interface ICurrenciesRetriever
  {
    Task<IEnumerable<Coin>> Get();
  }
}
