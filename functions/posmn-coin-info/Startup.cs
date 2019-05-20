using AutoMapper;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Posmn.CoinData.Services;
using posmn_coin_info;
using System.Reflection;

[assembly: WebJobsStartup(typeof(Startup))]
namespace posmn_coin_info
{
  public class Startup : IWebJobsStartup
  {
    public void Configure(IWebJobsBuilder builder)
    {
      // Registers custom services.
      builder.Services.AddTransient<ICoinDataTableStorage, CoinDataTableStorage>();
      builder.Services.AddAutoMapper(Assembly.GetAssembly(this.GetType()));
    }
  }
}
