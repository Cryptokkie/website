using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace coingecko_importer
{
  public class ImportFunction
  {
    private readonly ICoingeckoImporter coingeckoImporter;
    private readonly ILogger log;

    public ImportFunction(ILoggerFactory loggerFactory, ICoingeckoImporter coingeckoImporter)
    {
      this.log = loggerFactory.CreateLogger(Constants.FUNCTION_LOG_KEY);
      this.coingeckoImporter = coingeckoImporter;
    }

    [FunctionName("import")]
    public async Task Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
    {
      log.LogInformation($"Coingecko import function executed at: {DateTime.Now}");

      await coingeckoImporter.Execute();
    }
  }
}
