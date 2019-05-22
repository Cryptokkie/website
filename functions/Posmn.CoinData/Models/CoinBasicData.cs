namespace Posmn.CoinData.Models
{
  public class BasicCoinData
  {
    public string Id { get; set; }
    public string ImageUrlThumbnail { get; set; }
    public string Name { get; set; }
    public string Ticker { get; set; }
    public double Rating { get; set; }
    public BasicMarketData MarketData { get; set; }
  }
}
