using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace monkey_importer.Models
{
  public class Coins
  {
    public double Daily { get; set; }

    [JsonProperty("daily_btc")]
    public double DailyBtc { get; set; }

    [JsonProperty("daily_currency")]
    public double DailyUsd { get; set; }

    public double Weekly { get; set; }

    [JsonProperty("weekly_btc")]
    public double WeeklyBtc { get; set; }

    [JsonProperty("weekly_currency")]
    public double WeeklyUsd { get; set; }

    public double Monthly { get; set; }

    [JsonProperty("monthly_btc")]
    public double MonthlyBtc { get; set; }

    [JsonProperty("monthly_currency")]
    public double MonthlyUsd { get; set; }

    public double Yearly { get; set; }

    [JsonProperty("yearly_btc")]
    public double YearlyBtc { get; set; }

    [JsonProperty("yearly_currency")]
    public double YearlyUsd { get; set; }
  }
}
