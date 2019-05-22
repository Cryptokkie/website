namespace posmn_rating.Models
{
  public class Rating
  {
    public string CoinId { get; set; }
    public string UserId { get; set; }

    public double TeamRating { get; set; }
    public double CommunityRating { get; set; }
    public double WalletRating { get; set; }
    public double ProductRating { get; set; }

    // average of Team, Community, Wallet and Product
    public double AverageRating { get; set; }

    public string Comment { get; set; }
  }
}
