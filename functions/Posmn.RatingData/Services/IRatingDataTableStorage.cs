using System.Collections.Generic;
using System.Threading.Tasks;

namespace Posmn.RatingData.Services
{
  using Models;

  public interface IRatingDataTableStorage
  {
    Task Init();
    Task AddOrUpdateRating(Rating rating);
    Task<IEnumerable<Rating>> GetRatings(string coinId);
    Task<Rating> GetRating(string coinId, string userId);
  }
}
