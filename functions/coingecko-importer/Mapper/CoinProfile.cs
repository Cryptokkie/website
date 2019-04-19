using AutoMapper;
using CoinGecko.Entities.Response.Coins;
using System;
using System.Linq;

namespace coingecko_importer.Mapper
{
  class CoinProfile : Profile
  {
    public CoinProfile()
    {
      this.CreateMap<CoinFullDataById, Posmn.CoinData.Models.Coin>()
        .ForMember(d => d.Ticker, o => o.MapFrom(s => s.Symbol))
        .ForMember(d => d.Description, o => o.MapFrom(s => s.Description.ContainsKey("en") ? s.Description["en"] : ""))
        .ForMember(d => d.MarketcapRank, o => o.MapFrom(s => s.MarketCapRank.HasValue ? s.MarketCapRank.Value : 0))
        .ForMember(d => d.ImageUrlSmall, o => o.MapFrom(s => s.Image.Small.ToString()))
        .ForMember(d => d.ImageUrlThumbnail, o => o.MapFrom(s => s.Image.Thumb.ToString()))
        .ForMember(d => d.Social, o => o.MapFrom(s => s));

      this.CreateMap<CoinGecko.Entities.Response.Coins.Links, Posmn.CoinData.Models.Links>()
        .ForMember(d => d.Homepage, o => o.MapFrom(s => s.Homepage.ElementAtOrDefault(0)))
        .ForMember(d => d.Explorer, o => o.MapFrom(s => s.BlockchainSite.ElementAtOrDefault(0)))
        .ForMember(d => d.Github, o => o.MapFrom(s =>
          s.ReposUrl.Github.ElementAtOrDefault(0) != null
          ? s.ReposUrl.Github.ElementAtOrDefault(0).ToString()
          : null))
        .ForMember(d => d.Bitbucket, o => o.MapFrom(s =>
          s.ReposUrl.Bitbucket.ElementAtOrDefault(0) != null
          ? s.ReposUrl.Bitbucket.ElementAtOrDefault(0).ToString()
          : null));

      this.CreateMap<CoinGecko.Entities.Response.Coins.CoinByIdMarketData, Posmn.CoinData.Models.MarketData>()
        .ForMember(d => d.DailyChangePercentageBtc, o => o.MapFrom(s =>
          s.PriceChangePercentage24HInCurrency.ContainsKey("btc") ? s.PriceChangePercentage24HInCurrency["btc"] : 0))
        .ForMember(d => d.DailyChangePercentageUsd, o => o.MapFrom(s =>
          s.PriceChangePercentage24HInCurrency.ContainsKey("usd") ? s.PriceChangePercentage24HInCurrency["usd"] : 0))
        .ForMember(d => d.DailyVolumeBtc, o => o.MapFrom(s =>
          s.TotalVolume.ContainsKey("btc") ? s.TotalVolume["btc"] : 0))
        .ForMember(d => d.DailyVolumeUsd, o => o.MapFrom(s =>
          s.TotalVolume.ContainsKey("usd") ? s.TotalVolume["usd"] : 0))
        .ForMember(d => d.LastPriceBtc, o => o.MapFrom(s =>
          s.CurrentPrice.ContainsKey("btc") ? s.CurrentPrice["btc"] : 0))
        .ForMember(d => d.LastPriceUsd, o => o.MapFrom(s =>
          s.CurrentPrice.ContainsKey("usd") ? s.CurrentPrice["usd"] : 0))
        .ForMember(d => d.MarketcapBtc, o => o.MapFrom(s =>
          s.MarketCap.ContainsKey("btc") ? s.MarketCap["btc"] : 0))
        .ForMember(d => d.MarketcapUsd, o => o.MapFrom(s =>
          s.MarketCap.ContainsKey("usd") ? s.MarketCap["usd"] : 0))
        .ForMember(d => d.CirculatingSupply, o => o.MapFrom(s => decimal.Parse(s.CirculatingSupply)))
        .ForMember(d => d.TotalSupply, o => o.MapFrom(s => s.TotalSupply ?? 0))
        .ForMember(d => d.DailyLowBtc, o => o.MapFrom(s =>
          s.Low24H.ContainsKey("btc") ? s.Low24H["btc"] : 0))
        .ForMember(d => d.DailyHighBtc, o => o.MapFrom(s =>
          s.High24H.ContainsKey("btc") ? s.High24H["btc"] : 0))
        .ForMember(d => d.DailyLowUsd, o => o.MapFrom(s =>
          s.Low24H.ContainsKey("usd") ? s.Low24H["usd"] : 0))
        .ForMember(d => d.DailyHighUsd, o => o.MapFrom(s =>
          s.High24H.ContainsKey("usd") ? s.High24H["usd"] : 0))
        .ForMember(d => d.AlltimeHighBtc, o => o.MapFrom(s =>
          s.Ath.ContainsKey("btc") ? s.Ath["btc"] : 0))
        .ForMember(d => d.AlltimeHighUsd, o => o.MapFrom(s =>
          s.Ath.ContainsKey("usd") ? s.Ath["usd"] : 0))
        .ForMember(d => d.AlltimeHighPercentageBtc, o => o.MapFrom(s =>
          s.AthChangePercentage.ContainsKey("btc") ? s.AthChangePercentage["btc"] : 0))
        .ForMember(d => d.AlltimeHighPercentageUsd, o => o.MapFrom(s =>
          s.AthChangePercentage.ContainsKey("usd") ? s.AthChangePercentage["usd"] : 0))
        .ForMember(d => d.AlltimeHighDateBtc, o => o.MapFrom(s =>
          s.AthDate.ContainsKey("btc") ? s.AthDate["btc"] : new DateTimeOffset()))
        .ForMember(d => d.AlltimeHighDateUsd, o => o.MapFrom(s =>
          s.AthDate.ContainsKey("usd") ? s.AthDate["usd"] : new DateTimeOffset()));


      this.CreateMap<CoinFullDataById, Posmn.CoinData.Models.Social>()
        .ForMember(d => d.BitcointalkLink, o => o.MapFrom(s =>
          !string.IsNullOrEmpty(s.Links.BitcointalkThreadIdentifier + "")
          ? "https://bitcointalk.org/index.php?topic=" + s.Links.BitcointalkThreadIdentifier
          : null))
        .ForMember(d => d.DiscordLink, o => o.MapFrom(s =>
          s.Links.ChatUrl.Contains("discord")
          ? s.Links.ChatUrl
          : null))
        .ForMember(d => d.FacebookLink, o => o.MapFrom(s =>
          !string.IsNullOrEmpty(s.Links.FacebookUsername)
          ? "https://facebook.com/" + s.Links.FacebookUsername
          : null))
        .ForMember(d => d.FacebookLikes, o => o.MapFrom(s => s.CommunityData.FacebookLikes))
        .ForMember(d => d.RedditLink, o => o.MapFrom(s => s.Links.SubredditUrl))
        .ForMember(d => d.RedditSubscribers, o => o.MapFrom(s => s.CommunityData.RedditSubscribers))
        .ForMember(d => d.TelegramLink, o => o.MapFrom(s =>
          !string.IsNullOrEmpty(s.Links.TelegramChannelIdentifier)
          ? "https://t.me/" + s.Links.TelegramChannelIdentifier
          : null))
        .ForMember(d => d.TelegramUserCount, o => o.MapFrom(s => s.CommunityData.TelegramChannelUserCount))
        .ForMember(d => d.TwitterLink, o => o.MapFrom(s =>
          !string.IsNullOrEmpty(s.Links.TwitterScreenName)
          ? "https://twitter.com/" + s.Links.TwitterScreenName
          : null))
        .ForMember(d => d.TwitterFollowers, o => o.MapFrom(s => s.CommunityData.TwitterFollowers));
    }
  }
}
