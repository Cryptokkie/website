using Microsoft.WindowsAzure.Storage.Table;

namespace Posmn.CoinData.Models
{
  public class DataPoint
  {
    public string CoinId { get; set; }
    public int ActiveMasternodes { get; set; }
    public double DailyRewardUsd { get; set; }
    public double DailyRewardBtc { get; set; }
  }
}
