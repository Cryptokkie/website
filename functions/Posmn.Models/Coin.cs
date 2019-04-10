using System;

namespace Posmn.Models
{
  public class Coin
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Ticker { get; set; }
    public long MarketcapRank { get; set; }
    public MarketData MarketData { get; set; }
    public Links Links { get; set; }
    public Social Social { get; set; }
  }
}
