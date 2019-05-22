using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Posmn.RatingData.Services;
using Posmn.RatingData.Models;
using System.Linq;
using Newtonsoft.Json;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http.Headers;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

namespace posmn_rating
{
  public class RatingsFunction
  {
    private readonly IRatingDataTableStorage ratingsDataTableStorage;

    public RatingsFunction(IRatingDataTableStorage ratingsDataTableStorage)
    {
      this.ratingsDataTableStorage = ratingsDataTableStorage;
    }

    [FunctionName("rating")]
    public async Task<IActionResult> Rating(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      log.LogInformation("Rating function processed a post.");

      ClaimsPrincipal principal;
      if ((principal = Authentication.ValidateTokenAsync(req.Headers["Authorization"])) == null)
      {
        log.LogError("Authentication failed");
        return new UnauthorizedResult();
      }
      var uuidClaim = principal.Claims.FirstOrDefault(x => x.Type == "http://posmn.com/uuid");
      if (uuidClaim == null)
      {
        log.LogError("Missing uuid claim");
        return new UnauthorizedResult();
      }

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      var rating = JsonConvert.DeserializeObject<Rating>(requestBody);
      if (rating.CoinId == null)
      {
        return new BadRequestObjectResult("Please pass a valid rating object as json body");
      }
      rating.UserId = uuidClaim.Value;
      rating.AverageRating = (new double[] {
        rating.CommunityRating,
        rating.ProductRating,
        rating.TeamRating,
        rating.WalletRating
      }).Average();

      await ratingsDataTableStorage.Init();
      await ratingsDataTableStorage.AddOrUpdateRating(rating);

      return new OkResult();
    }

    [FunctionName("ratings")]
    public async Task<IActionResult> Ratings(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
      log.LogInformation("Ratings function processed a request.");

      string coinId = req.Query["coinId"];

      if (coinId == null)
      {
        return new BadRequestObjectResult("Please pass a coinId on the query string");
      }

      await ratingsDataTableStorage.Init();
      var ratings = await ratingsDataTableStorage.GetRatings(coinId);

      if (ratings.Count() == 0)
      {
        return new NotFoundResult();
      }

      string filter = req.Query["order"];
      string limitStr = req.Query["limit"];

      if (filter != null &&
        limitStr != null &&
        int.TryParse(limitStr, out var limit))
      {
        switch (filter.ToLower())
        {
          case "top":
            ratings = ratings.OrderByDescending(x => x.AverageRating).Take(limit);
            break;
          case "bad":
            ratings = ratings.OrderBy(x => x.AverageRating).Take(limit);
            break;
          default:
            break;
        }
      }

      return new OkObjectResult(ratings);
    }

    [FunctionName("average-rating")]
    public async Task<IActionResult> AverageRating(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
      log.LogInformation("Average rating function processed a request.");

      string coinId = req.Query["coinId"];

      if (coinId == null)
      {
        return new BadRequestObjectResult("Please pass a coinId on the query string");
      }

      await ratingsDataTableStorage.Init();
      var ratings = await ratingsDataTableStorage.GetRatings(coinId);

      if (ratings.Count() == 0)
      {
        return new NotFoundResult();
      }

      var response = new Rating()
      {
        CoinId = coinId,
        AverageRating = ratings.Average(x => x.AverageRating),
        CommunityRating = ratings.Average(x => x.CommunityRating),
        ProductRating = ratings.Average(x => x.ProductRating),
        WalletRating = ratings.Average(x => x.WalletRating),
        TeamRating = ratings.Average(x => x.TeamRating)
      };

      return new OkObjectResult(response);
    }

    [FunctionName("user-rating")]
    public async Task<IActionResult> UserRating(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
      log.LogInformation("User rating function processed a request.");

      string coinId = req.Query["coinId"];

      if (coinId == null)
      {
        return new BadRequestObjectResult("Please pass a coinId on the query string");
      }

      ClaimsPrincipal principal;
      if ((principal = Authentication.ValidateTokenAsync(req.Headers["Authorization"])) == null)
      {
        log.LogError("Authentication failed");
        return new UnauthorizedResult();
      }
      var uuidClaim = principal.Claims.FirstOrDefault(x => x.Type == "http://posmn.com/uuid");
      if (uuidClaim == null)
      {
        log.LogError("Missing uuid claim");
        return new UnauthorizedResult();
      }

      await ratingsDataTableStorage.Init();
      var response = await ratingsDataTableStorage.GetRating(coinId, uuidClaim.Value);

      if (response == null)
      {
        return new NotFoundResult();
      }

      return new OkObjectResult(response);
    }
  }
}
