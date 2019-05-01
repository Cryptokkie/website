using System;
using System.Collections.Generic;
using System.Text;

namespace Posmn.CoinData.Models
{
  public class CoinExchange
  {
    public string CoinId { get; set; }
    public string Base { get; set; }
    public string Target { get; set; }
    public string ExchangeName { get; set; }
    public string ExchangeIdentifier { get; set; }
    public double LastPriceBtc { get; set; }
    public double LastPriceUsd { get; set; }
    public double VolumeBtc { get; set; }
    public double VolumeUsd { get; set; }
    public Boolean IsStale { get; set; }
    public string Url { get; set; }
  }
}
