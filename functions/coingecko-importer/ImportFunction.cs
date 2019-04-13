using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace coingecko_importer
{
  public class ImportFunction
  {
    private readonly ICoingeckoImporter coingeckoImporter;
    
    public ImportFunction(ICoingeckoImporter coingeckoImporter)
    {
      this.coingeckoImporter = coingeckoImporter;
    }

    [FunctionName("CoingeckoImport")]
    public async Task Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
    {
      log.LogInformation($"Coingecko import function executed at: {DateTime.Now}");

      await coingeckoImporter.Execute();
    }
  }
}
