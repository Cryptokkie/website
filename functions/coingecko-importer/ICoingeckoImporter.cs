using System.Threading.Tasks;

namespace coingecko_importer
{
  public interface ICoingeckoImporter
  {
    Task Execute();
  }
}
