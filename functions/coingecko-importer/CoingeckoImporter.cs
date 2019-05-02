using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CoinGecko.Entities.Response.Coins;
using CoinGecko.Entities.Response.Exchanges;
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
    private readonly IExchangesClient exchangesGeckoClient;
    private readonly IMapper mapper;

    public CoingeckoImporter(
      ILoggerFactory loggerFactory,
      ICoinDataTableStorage coinDataTableStorage,
      ICoinsClient coinGeckoClient,
      IExchangesClient exchangesGeckoClient,
      IMapper mapper)
    {
      this.log = loggerFactory.CreateLogger(Constants.FUNCTION_LOG_KEY);
      this.coinDataTableStorage = coinDataTableStorage;
      this.coinGeckoClient = coinGeckoClient;
      this.exchangesGeckoClient = exchangesGeckoClient;
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
          var allExchanges = await this.exchangesGeckoClient.GetExchanges();
          Task.WaitAll(
            StoreCoinData(coinData),
            StoreCoinExchanges(coinData, allExchanges)
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

    private async Task StoreCoinExchanges(CoinFullDataById coinData, IReadOnlyList<Exchanges> allExchanges)
    {
      var coinExchanges = mapper.Map<CoinExchange[]>(coinData.Tickers);
      coinExchanges = AddExchangesThumbnails(coinExchanges, allExchanges);

      foreach (var coinExchange in coinExchanges)
      {
        await coinDataTableStorage.AddCoinExchange(coinExchange);
      }
      this.log.LogInformation("Imported exchanges for '{0}' succesfully", coinData.Id);
    }

    private CoinExchange[] AddExchangesThumbnails(CoinExchange[] coinExchanges, IReadOnlyList<Exchanges> allExchanges)
    {
      foreach (var coinExchange in coinExchanges)
      {
        coinExchange.ImageUrl = allExchanges.FirstOrDefault(x => x.Id == coinExchange.ExchangeIdentifier)?.Image;
      }
      return coinExchanges;
    }
  }
}
