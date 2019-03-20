using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace posmn_coin_info
{
  public class CurrenciesFunction
  {
    private readonly ICurrenciesRetriever currenciesRetriever;
    private readonly ILogger log;

    public CurrenciesFunction(ILoggerFactory loggerFactory, ICurrenciesRetriever currenciesRetriever)
    {
      this.log = loggerFactory.CreateLogger(Constants.FUNCTION_LOG_KEY);
      this.currenciesRetriever = currenciesRetriever;
    }

    [FunctionName("currencies")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req)
    {
      this.log.LogInformation("C# HTTP trigger function processed a request.");

      var currenciesResponse = await currenciesRetriever.Get();

      return new OkObjectResult(currenciesResponse);
    }
  }
}
