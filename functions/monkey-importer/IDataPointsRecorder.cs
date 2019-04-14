using System.Threading.Tasks;

namespace monkey_importer
{
  public interface IDataPointsRecorder
  {
    Task Execute();
  }
}