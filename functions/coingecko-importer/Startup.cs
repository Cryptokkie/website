using CoinGecko.Clients;
using CoinGecko.Interfaces;
using coingecko_importer;
using coingecko_importer.Services;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;

[assembly: WebJobsStartup(typeof(Startup))]
namespace coingecko_importer
{
  public class Startup : IWebJobsStartup
  {
    public void Configure(IWebJobsBuilder builder)
    {
      // Registers custom services.
      builder.Services.AddTransient<ICoinDataTableStorage, CoinDataTableStorage>();
      builder.Services.AddTransient<ICoingeckoImporter, CoingeckoImporter>();
      builder.Services.AddTransient<ICoinsClient>(x => new CoinsClient(new HttpClient()));
    }
  }
}
