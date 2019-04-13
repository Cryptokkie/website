using System.Threading.Tasks;

namespace monkey_importer.Services
{
  using Models;

  public interface ICoinExplorerService
  {
    Task<CoinExplorerData> GetData(string coinId);
  }
}
