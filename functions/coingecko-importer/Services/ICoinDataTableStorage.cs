using coingecko_importer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace coingecko_importer.Services
{
  public interface ICoinDataTableStorage
  {
    Task AddCoin(Coin coin);
    Task<IEnumerable<string>> GetSupportedCoins();
    Task Init();
  }
}
