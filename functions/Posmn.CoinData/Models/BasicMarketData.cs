using System;

namespace Posmn.CoinData.Models
{
  public class BasicMarketData
  {
    public double ChangePercentage24hBtc { get; set; }
    public double ChangePercentage24hUsd { get; set; }
    public double DailyVolumeBtc { get; set; }
    public double DailyVolumeUsd { get; set; }
    public double LastPriceBtc { get; set; }
    public double LastPriceUsd { get; set; }
    public double MarketcapBtc { get; set; }
    public double MarketcapUsd { get; set; }
    public double CirculatingSupply { get; set; }
    public long TotalSupply { get; set; }
  }
}
