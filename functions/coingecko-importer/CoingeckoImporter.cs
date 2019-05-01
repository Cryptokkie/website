using System;
using System.Threading.Tasks;
using AutoMapper;
using CoinGecko.Entities.Response.Coins;
using CoinGecko.Interfaces;
using Microsoft.Extensions.Logging;
using Posmn.CoinData.Models;
using Posmn.CoinData.Services;

namespace coingecko_importer
{
  public class CoingeckoImporter : ICoingeckoImporter
  {
    private readonly ILogger log;
    private readonly ICoinDataTableStorage coinDataTableStorage;
    private readonly ICoinsClient coinGeckoClient;
    private readonly IMapper mapper;

    public CoingeckoImporter(
      ILoggerFactory loggerFactory,
      ICoinDataTableStorage coinDataTableStorage,
      ICoinsClient coinGeckoClient,
      IMapper mapper)
    {
      this.log = loggerFactory.CreateLogger(Constants.FUNCTION_LOG_KEY);
      this.coinDataTableStorage = coinDataTableStorage;
      this.coinGeckoClient = coinGeckoClient;
      this.mapper = mapper;
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
          Task.WaitAll(
            StoreCoinData(coinData),
            StoreCoinExchanges(coinData)
          );
        }
        catch (Exception ex)
        {
          this.log.LogError("Error retrieving '{0}' from Coingecko and storing it in the CoinData Table Storage: {1}", coinId, ex.ToString());
        }
      }
    }
    
    private async Task StoreCoinData(CoinFullDataById coinData)
    {
      var coin = mapper.Map<Coin>(coinData);
      await coinDataTableStorage.AddCoin(coin);
      this.log.LogInformation("Imported data for '{0}' succesfully", coin.Id);
    }

    private async Task StoreCoinExchanges(CoinFullDataById coinData)
    {
      var coinExchanges = mapper.Map<CoinExchange[]>(coinData.Tickers);
      foreach (var coinExchange in coinExchanges)
      {
        await coinDataTableStorage.AddCoinExchange(coinExchange);
      }
      this.log.LogInformation("Imported exchanges for '{0}' succesfully", coinData.Id);
    }
  }
}
