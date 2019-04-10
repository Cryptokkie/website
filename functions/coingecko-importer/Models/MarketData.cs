using System;
using CoinGecko.Entities.Response.Coins;

namespace coingecko_importer.Models
{
  public class MarketData
  {
    public double DailyChangePercentageBtc { get; set; }
    public double DailyChangePercentageUsd { get; set; }
    public double DailyVolumeBtc { get; set; }
    public double DailyVolumeUsd { get; set; }
    public double LastPriceBtc { get; set; }
    public double LastPriceUsd { get; set; }
    public double MarketcapBtc { get; set; }
    public double MarketcapUsd { get; set; }
    public decimal CirculatingSupply { get; set; }
    public long TotalSupply { get; set; }

    public static MarketData FromCoinGecko(CoinByIdMarketData marketData)
    {
      return new MarketData()
      {
        DailyChangePercentageBtc = marketData.PriceChangePercentage24HInCurrency["btc"],
        DailyChangePercentageUsd = marketData.PriceChangePercentage24HInCurrency["usd"],
        DailyVolumeBtc = marketData.TotalVolume["btc"] ?? 0,
        DailyVolumeUsd = marketData.TotalVolume["usd"] ?? 0,
        LastPriceBtc = marketData.CurrentPrice["btc"] ?? 0,
        LastPriceUsd = marketData.CurrentPrice["usd"] ?? 0,
        MarketcapBtc = marketData.MarketCap["btc"] ?? 0,
        MarketcapUsd = marketData.MarketCap["usd"] ?? 0,
        CirculatingSupply = decimal.Parse(marketData.CirculatingSupply),
        TotalSupply = marketData.TotalSupply ?? 0,
      };
    }
  }
}
