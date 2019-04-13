namespace Posmn.CoinData.Models
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
    public int MarketcapRank { get; set; }
    public double DailyLowBtc { get; set; }
    public double DailyHighBtc { get; set; }
    public double DailyLowUsd { get; set; }
    public double DailyHighUsd { get; set; }
  }
}
