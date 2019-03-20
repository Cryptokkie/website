using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using posmn_coin_info.Models;

namespace posmn_coin_info.Services
{
  public class CoinExplorerService : ICoinExplorerService
  {
    // store coins hardcoded for now, should retrieve these dynamically
    private static readonly string[] currencyNames = {
      "monkey-project",
      "zest",
      "bitcoin-green",
      "blocknode",
      "deviantcoin",
      "mastercoin",
      "smartcash"
    };

    private readonly ILogger log;

    public CoinExplorerService(ILoggerFactory loggerFactory)
    {
      this.log = loggerFactory.CreateLogger(Constants.FUNCTION_LOG_KEY);
    }

    public async Task<IEnumerable<CurrencyStats>> GetCurrencies()
    {
      return await Task.WhenAll(currencyNames.Select(x => GetCurrency(x)));
    }

    public async Task<CurrencyStats> GetCurrency(string currencyName)
    {
      var requestUrl = $"http://explorer.monkeytracking.io/{currencyName}/coinstats";

      using (var httpClient = new HttpClient())
      {
        var apiKey = Environment.GetEnvironmentVariable("monk_explorer_api_key");

        httpClient.DefaultRequestHeaders.Add("api-key", apiKey);

        using (var message = await httpClient.GetAsync(requestUrl).ConfigureAwait(false))
        {
          message.EnsureSuccessStatusCode();

          var result = await message.Content.ReadAsStringAsync().ConfigureAwait(false);
          var res = JsonConvert.DeserializeObject<CurrencyStats>(result);

          return res;
        }
      }
    }
  }
}
