using Posmn.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace posmn_coin_info.Services
{
  public interface ICoinDataTableStorage
  {
    Task<IEnumerable<Coin>> GetCoins();
  }
}
