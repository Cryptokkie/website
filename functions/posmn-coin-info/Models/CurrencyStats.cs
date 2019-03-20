using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace posmn_coin_info.Models
{
  public class CurrencyStats
  {
    public string Name { get; set; }

    [JsonProperty("24h_change")]
    public decimal setDailyChange { set { DailyChange = value; } }
    public decimal DailyChange { get; set; }

    [JsonProperty("24h_volume_btc")]
    public decimal setDailyVolumeBtc { set { DailyVolumeBtc = value; } }
    public decimal DailyVolumeBtc { get; set; }

    [JsonProperty("24h_volume_currency")]
    public decimal setDailyVolumeCurrency { set { DailyVolumeCurrency = value; } }
    public decimal DailyVolumeCurrency { get; set; }

    public string Currency { get; set; }

    [JsonProperty("lastprice_btc")]
    public decimal setLastPriceBtc { set { LastPriceBtc = value; } }
    public decimal LastPriceBtc { get; set; }

    [JsonProperty("lastprice_currency")]
    public decimal setLastPriceCurrency { set { LastPriceCurrency = value; } }
    public decimal LastPriceCurrency { get; set; }

    public decimal Marketcap { get; set; }

    public decimal Supply { get; set; }

    public string Ticker { get; set; }


    //"masternode": {
    //    "active": 1509,
    //    "coins": {
    //        "daily": 6.89463221,
    //        "daily_btc": "0.00011735",
    //        "daily_currency": "0.45",
    //        "monthly": "206.83896630",
    //        "monthly_btc": "0.00352040",
    //        "monthly_currency": "13.59",
    //        "weekly": "48.26242547",
    //        "weekly_btc": "0.00082143",
    //        "weekly_currency": "3.17",
    //        "yearly": "2516.54075665",
    //        "yearly_btc": "0.04283152",
    //        "yearly_currency": "165.39"
    //    },
    //    "collateral": 2000,
    //    "locked": 3018000,
    //    "locked_percentage": "57.24",
    //    "price_btc": "0.03404000",
    //    "price_currency": "131.45",
    //    "roi_year": "125.83"
    //}

  }
}
