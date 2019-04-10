using CoinGecko.Entities.Response.Coins;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace coingecko_importer.Models
{
  public class CoinEntity : TableEntity
  {
    public CoinEntity(string id)
    {
      this.PartitionKey = "coin";
      this.RowKey = id;
    }

    public string Name { get; set; }
    public double? DailyChange { get; set; }
    public decimal DailyChangePercentage { get; set; }
    public decimal DailyVolumeBtc { get; set; }
    public decimal DailyVolumeCurrency { get; set; }
    public string Currency { get; set; }
    public decimal LastPriceBtc { get; set; }
    public decimal LastPriceCurrency { get; set; }
    public decimal Marketcap { get; set; }
    public decimal Supply { get; set; }
    public string Ticker { get; set; }

    internal static CoinEntity FromCoinGecko(CoinFullDataById coinData)
    {
      return new CoinEntity(coinData.Id)
      {
        Name = coinData.Name,
        DailyChange = coinData.MarketData.PriceChange24H
      };
    }
  }
}
