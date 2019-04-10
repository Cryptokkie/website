using System;
using System.Text;

namespace coingecko_importer.Models
{
  public class Coin
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Ticker { get; set; }
    public MarketData MarketData { get; set; }
    public Links Links { get; set; }

    public static Coin FromCoinGecko(CoinGecko.Entities.Response.Coins.CoinFullDataById coinData)
    {
      return new Coin()
      {
        Id = coinData.Id,
        Name = coinData.Name,
        Ticker = coinData.Symbol,
        MarketData = MarketData.FromCoinGecko(coinData.MarketData),
        Links = Links.FromCoinGecko(coinData.Links)
      };
    }
  }
}
