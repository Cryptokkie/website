using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace monkey_importer
{
  using Posmn.CoinData.Services;
  using Posmn.CoinData.Models;
  using Services;

  public class MonkeyImporter : IMonkeyImporter
  {
    private readonly ILogger log;
    private readonly ICoinDataTableStorage coinDataTableStorage;
    private readonly IMapper mapper;
    private readonly ICoinExplorerService coinExplorerService;

    public MonkeyImporter(
      ILoggerFactory loggerFactory,
      ICoinDataTableStorage coinDataTableStorage,
      ICoinExplorerService coinExplorerService,
      IMapper mapper)
    {
      this.log = loggerFactory.CreateLogger(Constants.FUNCTION_LOG_KEY);
      this.coinDataTableStorage = coinDataTableStorage ?? throw new ArgumentNullException(nameof(coinDataTableStorage));
      this.coinExplorerService = coinExplorerService ?? throw new ArgumentNullException(nameof(coinExplorerService));
      this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task Execute()
    {
      await coinDataTableStorage.Init();
      var supportedCoins = await coinDataTableStorage.GetSupportedCoins();

      foreach (var coinId in supportedCoins)
      {
        try
        {
          var coinExplorerData = await coinExplorerService.GetData(coinId);
          var masternodeStats = mapper.Map<MasternodeStats>(coinExplorerData.Masternode);
          masternodeStats.CoinId = coinId;
          masternodeStats.Blockheight = coinExplorerData.Blockheight;
          await coinDataTableStorage.AddMasternodeStats(masternodeStats);
          this.log.LogInformation("Imported masternode stats for '{0}' succesfully", coinId);
        }
        catch (Exception ex)
        {
          this.log.LogError("Error retrieving '{0}' from Monkey Explorer and storing it in the CoinData Table Storage: {1}", coinId, ex.ToString());
        }
      }
    }
  }
}
