using System.Threading.Tasks;

namespace monkey_importer
{
  public interface IMonkeyImporter
  {
    Task Execute();
  }
}