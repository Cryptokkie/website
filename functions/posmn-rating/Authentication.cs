using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace posmn_rating
{
  public static class Authentication
  {
    public static ClaimsPrincipal ValidateTokenAsync(string value)
    {
      if (value == null)
      {
        return null;
      }

      var authHeader = AuthenticationHeaderValue.Parse(value);

      if (authHeader?.Scheme != "Bearer")
      {
        return null;
      }

      var rs256Token = Environment.GetEnvironmentVariable("AUTH0_SIGNING_CERTIFICATE");
      rs256Token = rs256Token.Replace("-----BEGIN CERTIFICATE-----", "");
      rs256Token = rs256Token.Replace("-----END CERTIFICATE-----", "");
      rs256Token = rs256Token.Replace("\n", "");

      var keyBytes = Convert.FromBase64String(rs256Token);

      var validationParameter = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Environment.GetEnvironmentVariable("AUTH0_DOMAIN_URL") + '/',
        ValidAudience = Environment.GetEnvironmentVariable("AUTH0_API_ID"),
        IssuerSigningKey = new X509SecurityKey(new X509Certificate2(keyBytes))
      };

      ClaimsPrincipal result = null;
      try
      {
        var handler = new JwtSecurityTokenHandler();
        result = handler.ValidateToken(authHeader.Parameter, validationParameter, out var token);
      }
      catch (SecurityTokenException)
      {
      }
      return result;
    }
  }
}
