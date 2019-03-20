using System;
using System.IO;
using System.Runtime.Caching;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace posmn_coin_info
{
  public static class CurrenciesFunction
  {
    private static readonly CurrenciesRetriever currenciesRetriever = new CurrenciesRetriever();

    [FunctionName("currencies")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
      log.LogInformation("C# HTTP trigger function processed a request.");

      var currenciesResponse = await currenciesRetriever.Get();

      return new OkObjectResult(currenciesResponse);

      //return name != null
      //          ? (ActionResult)new OkObjectResult($"Hello, {name}")
      //          : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
    }
  }
}
