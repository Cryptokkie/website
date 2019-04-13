using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace monkey_importer.Services
{
  using Models;

  public class CoinExplorerService : ICoinExplorerService
  {

    public CoinExplorerService()
    {
    }

    public async Task<CoinExplorerData> GetData(string coinId)
    {
      var requestUrl = $"http://explorer.monkeytracking.io/{coinId}/coinstats";

      using (var httpClient = new HttpClient())
      {
        var apiKey = Environment.GetEnvironmentVariable("monk_explorer_api_key");

        httpClient.DefaultRequestHeaders.Add("api-key", apiKey);

        using (var message = await httpClient.GetAsync(requestUrl).ConfigureAwait(false))
        {
          message.EnsureSuccessStatusCode();

          var result = await message.Content.ReadAsStringAsync().ConfigureAwait(false);
          var res = JsonConvert.DeserializeObject<CoinExplorerData>(result);

          return res;
        }
      }
    }
  }
}
