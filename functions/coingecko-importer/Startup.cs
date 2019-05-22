using AutoMapper;
using CoinGecko.Clients;
using CoinGecko.Interfaces;
using coingecko_importer;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Posmn.CoinData.Services;
using Posmn.RatingData.Services;
using System.Net.Http;
using System.Reflection;

[assembly: WebJobsStartup(typeof(Startup))]
namespace coingecko_importer
{
  public class Startup : IWebJobsStartup
  {
    public void Configure(IWebJobsBuilder builder)
    {
      // Registers custom services.
      builder.Services.AddTransient<ICoinDataTableStorage, CoinDataTableStorage>();
      builder.Services.AddTransient<IRatingDataTableStorage, RatingDataTableStorage>();
      builder.Services.AddTransient<ICoingeckoImporter, CoingeckoImporter>();
      builder.Services.AddTransient<ICoinsClient>(x => new CoinsClient(new HttpClient()));
      builder.Services.AddTransient<IExchangesClient>(x => new ExchangesClient(new HttpClient()));
      builder.Services.AddAutoMapper(Assembly.GetAssembly(this.GetType()));
    }
  }
}
