using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using CoinGecko.Clients;
using CoinGecko.Interfaces;
using coingecko_importer.Models;
using coingecko_importer.Services;
using Microsoft.Extensions.Logging;

namespace coingecko_importer
{
  public class CoingeckoImporter : ICoingeckoImporter
  {
    private readonly ILogger log;
    private readonly ICoinDataTableStorage coinDataTableStorage;
    private readonly ICoinsClient coinGeckoClient;

    public CoingeckoImporter(ILoggerFactory loggerFactory, ICoinDataTableStorage coinDataTableStorage, ICoinsClient coinGeckoClient)
    {
      this.log = loggerFactory.CreateLogger(Constants.FUNCTION_LOG_KEY);
      this.coinDataTableStorage = coinDataTableStorage;
      this.coinGeckoClient = coinGeckoClient;
    }

    public async Task Execute()
    {
      await coinDataTableStorage.Init();
      var supportedCoins = await coinDataTableStorage.GetSupportedCoins();

      foreach (var coinId in supportedCoins)
      {
        try
        {
          var coinData = await coinGeckoClient.GetAllCoinDataWithId(coinId);
          var coin = Coin.FromCoinGecko(coinData);
          await coinDataTableStorage.AddCoin(coin);
          this.log.LogInformation("Imported '{0}' succesfully", coinId);
        }
        catch (Exception ex)
        {
          this.log.LogError("Error retrieving '{0}' from Coingecko and storing it in the CoinData Table Storage: {1}", coinId, ex.ToString());
        }
      }
    }
  }
}
