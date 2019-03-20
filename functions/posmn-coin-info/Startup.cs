using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.DependencyInjection;
using posmn_coin_info;
using posmn_coin_info.Services;
using System;
using System.Collections.Generic;
using System.Text;

[assembly: WebJobsStartup(typeof(Startup))]
namespace posmn_coin_info
{
  public class Startup : IWebJobsStartup
  {
    public void Configure(IWebJobsBuilder builder)
    {
      // Registers custom services.
      builder.Services.AddTransient<ICurrenciesRetriever, CurrenciesRetriever>();
      builder.Services.AddTransient<ICachingService, CachingService>();
      builder.Services.AddTransient<ICoinExplorerService, CoinExplorerService>();
    }
  }
}
