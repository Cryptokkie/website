using System;

namespace Posmn.CoinData.Models
{
  public class MarketData
  {
    public double ChangePercentage1hBtc { get; set; }
    public double ChangePercentage1hUsd { get; set; }

    public double ChangePercentage24hBtc { get; set; }
    public double ChangePercentage24hUsd { get; set; }

    public double ChangePercentage7dBtc { get; set; }
    public double ChangePercentage7dUsd { get; set; }

    public double ChangePercentage14dBtc { get; set; }
    public double ChangePercentage14dUsd { get; set; }

    public double ChangePercentage30dBtc { get; set; }
    public double ChangePercentage30dUsd { get; set; }

    public double ChangePercentage60dBtc { get; set; }
    public double ChangePercentage60dUsd { get; set; }

    public double ChangePercentage200dBtc { get; set; }
    public double ChangePercentage200dUsd { get; set; }

    public double ChangePercentage1yBtc { get; set; }
    public double ChangePercentage1yUsd { get; set; }

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
    public double AlltimeHighBtc { get; set; }
    public double AlltimeHighUsd { get; set; }
    public double AlltimeHighPercentageBtc { get; set; }
    public double AlltimeHighPercentageUsd { get; set; }
    public DateTimeOffset AlltimeHighDateBtc { get; set; }
    public DateTimeOffset AlltimeHighDateUsd { get; set; }
  }
}
