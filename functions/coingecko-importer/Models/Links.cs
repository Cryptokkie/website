using System;
using System.Linq;

namespace coingecko_importer.Models
{
  public class Links
  {
    public string Homepage { get; set; }
    public string Explorer { get; set; }
    public string Github { get; set; }
    public string Bitbucket { get; set; }

    public static Links FromCoinGecko(CoinGecko.Entities.Response.Coins.Links links)
    {
      return new Links()
      {
        Homepage = links.Homepage.ElementAtOrDefault(0),
        Explorer = links.BlockchainSite.ElementAtOrDefault(0),
        Github = links.ReposUrl?.Github?.ElementAtOrDefault(0)?.ToString(),
        Bitbucket = links.ReposUrl?.Bitbucket?.ElementAtOrDefault(0)?.ToString()
      };
    }
  }
}
