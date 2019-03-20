using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using posmn_coin_info.Models;

namespace posmn_coin_info.Services
{
  public class CoinExplorerService
  {
    // store coins hardcoded for now, should retrieve these dynamically
    private static readonly string[] currencyNames = {
      "monkey-project",
      //"zest",
      //"bitcoin-green",
      //"blocknode",
      //"deviantcoin",
      //"mastercoin",
      //"smartcash"
    };

    public async Task<IEnumerable<CurrencyStats>> GetCurrencies()
    {
      return await Task.WhenAll(currencyNames.Select(x => GetCurrency(x)));
    }

    public async Task<CurrencyStats> GetCurrency(string currencyName)
    {
      var requestUrl = $"http://explorer.monkeytracking.io/{currencyName}/coinstats";

      using (var httpClient = new HttpClient())
      {
        httpClient.DefaultRequestHeaders.Add("api-key", "8e9e9f0e5b917da814cd24c57b56bed7");

        using (var message = await httpClient.GetAsync(requestUrl).ConfigureAwait(false))
        {
          // do some error handling and logging here

          var result = await message.Content.ReadAsStringAsync().ConfigureAwait(false);
          var res = JsonConvert.DeserializeObject<CurrencyStats>(result);

          return res;
        }
      }
    }
  }
}
