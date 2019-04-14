using Microsoft.WindowsAzure.Storage.Table;

namespace Posmn.CoinData.Models
{
  public class MasternodeStats
  {
    public string CoinId { get; set; }
    public int ActiveMasternodes { get; set; }
    public int Collateral { get; set; }
    public long LockedAmount { get; set; }
    public int Blockheight { get; set; }
    public double LockedPercentage { get; set; }

    public double YearlyRoi { get; set; }

    public double DailyReward { get; set; }
    public double DailyRewardBtc { get; set; }
    public double DailyRewardUsd { get; set; }
    public double WeeklyReward { get; set; }
    public double WeeklyRewardBtc { get; set; }
    public double WeeklyRewardUsd { get; set; }
    public double MonthlyReward { get; set; }
    public double MonthlyRewardBtc { get; set; }
    public double MonthlyRewardUsd { get; set; }
    public double YearlyReward { get; set; }
    public double YearlyRewardBtc { get; set; }
    public double YearlyRewardUsd { get; set; }
  }
}
