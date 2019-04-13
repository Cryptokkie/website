using AutoMapper;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.DependencyInjection;
using monkey_importer;
using monkey_importer.Services;
using Posmn.CoinData.Services;
using System.Reflection;

[assembly: WebJobsStartup(typeof(Startup))]
namespace monkey_importer
{
  public class Startup : IWebJobsStartup
  {
    public void Configure(IWebJobsBuilder builder)
    {
      // Registers custom services.
      builder.Services.AddTransient<IMonkeyImporter, MonkeyImporter>();
      builder.Services.AddTransient<ICoinDataTableStorage, CoinDataTableStorage>();
      builder.Services.AddTransient<ICoinExplorerService, CoinExplorerService>();
      builder.Services.AddAutoMapper(Assembly.GetAssembly(this.GetType()));
    }
  }
}
