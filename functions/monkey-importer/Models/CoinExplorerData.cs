using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace monkey_importer.Models
{
  public class CoinExplorerData
  {
    public string Name { get; set; }

    [JsonProperty("24h_change")]
    public decimal DailyChange { get; set; }

    [JsonProperty("24h_volume_btc")]
    public decimal DailyVolumeBtc { get; set; }

    [JsonProperty("24h_volume_currency")]
    public decimal DailyVolumeCurrency { get; set; }

    public string Currency { get; set; }

    public int Blockheight { get; set; }

    [JsonProperty("lastprice_btc")]
    public decimal LastPriceBtc { get; set; }

    [JsonProperty("lastprice_currency")]
    public decimal LastPriceCurrency { get; set; }

    public decimal Marketcap { get; set; }

    public decimal Supply { get; set; }

    public string Ticker { get; set; }

    public Masternode Masternode { get; set; }

  }
}
