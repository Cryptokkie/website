using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using posmn_rating;
using posmn_rating.Services;
using System;
using System.Text;

[assembly: WebJobsStartup(typeof(Startup))]
namespace posmn_rating
{
  public class Startup : IWebJobsStartup
  {
    public void Configure(IWebJobsBuilder builder)
    {
      // Registers custom services.
      builder.Services.AddTransient<IRatingDataTableStorage, RatingDataTableStorage>();
    }
  }
}
