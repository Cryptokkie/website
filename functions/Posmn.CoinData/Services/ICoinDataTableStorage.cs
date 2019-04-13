using System.Collections.Generic;
using System.Threading.Tasks;

namespace Posmn.CoinData.Services
{
  using Models;

  public interface ICoinDataTableStorage
  {
    Task Init();
    Task<IEnumerable<string>> GetSupportedCoins();
    Task AddCoin(Coin coin);
    Task<IEnumerable<Coin>> GetCoins();

    Task AddMasternodeStats(MasternodeStats masternodeStats);
    Task<MasternodeStats> GetMasternodeStats(string coinId);
  }
}
