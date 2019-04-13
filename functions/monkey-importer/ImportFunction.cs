using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace monkey_importer
{
  public class ImportFunction
  {
    private readonly IMonkeyImporter monkeyImporter;

    public ImportFunction(IMonkeyImporter monkeyImporter)
    {
      this.monkeyImporter = monkeyImporter ?? throw new ArgumentNullException(nameof(monkeyImporter));
    }

    [FunctionName("MonkeyImport")]
    public async Task Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
    {
      log.LogInformation($"Monkey explorer import function executed at: {DateTime.Now}");

      await monkeyImporter.Execute();
    }
  }
}
