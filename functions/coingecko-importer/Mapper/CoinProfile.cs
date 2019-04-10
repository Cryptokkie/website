using AutoMapper;
using CoinGecko.Entities.Response.Coins;
using Posmn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace coingecko_importer.Mapper
{
  class CoinProfile : Profile
  {
    public CoinProfile()
    {
      this.CreateMap<CoinFullDataById, Posmn.Models.Coin>()
        .ForMember(d => d.Ticker, o => o.MapFrom(s => s.Symbol))
        .ForMember(d => d.MarketcapRank, o => o.MapFrom(s => s.MarketCapRank.HasValue ? s.MarketCapRank.Value : 0))
        .ForMember(d => d.Social, o => o.MapFrom(s => s));

      this.CreateMap<CoinGecko.Entities.Response.Coins.Links, Posmn.Models.Links>()
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

      this.CreateMap<CoinGecko.Entities.Response.Coins.CoinByIdMarketData, Posmn.Models.MarketData>()
        .ForMember(d => d.DailyChangePercentageBtc, o => o.MapFrom(s => s.PriceChangePercentage24HInCurrency["btc"]))
        .ForMember(d => d.DailyChangePercentageUsd, o => o.MapFrom(s => s.PriceChangePercentage24HInCurrency["usd"]))
        .ForMember(d => d.DailyVolumeBtc, o => o.MapFrom(s => s.TotalVolume["btc"]))
        .ForMember(d => d.DailyVolumeUsd, o => o.MapFrom(s => s.TotalVolume["usd"]))
        .ForMember(d => d.LastPriceBtc, o => o.MapFrom(s => s.CurrentPrice["btc"]))
        .ForMember(d => d.LastPriceUsd, o => o.MapFrom(s => s.CurrentPrice["usd"]))
        .ForMember(d => d.MarketcapBtc, o => o.MapFrom(s => s.MarketCap["btc"]))
        .ForMember(d => d.MarketcapUsd, o => o.MapFrom(s => s.MarketCap["usd"]))
        .ForMember(d => d.CirculatingSupply, o => o.MapFrom(s => decimal.Parse(s.CirculatingSupply)))
        .ForMember(d => d.TotalSupply, o => o.MapFrom(s => s.TotalSupply ?? 0))
        .ForMember(d => d.DailyLowBtc, o => o.MapFrom(s => s.Low24H["btc"]))
        .ForMember(d => d.DailyHighBtc, o => o.MapFrom(s => s.High24H["btc"]))
        .ForMember(d => d.DailyLowUsd, o => o.MapFrom(s => s.Low24H["usd"]))
        .ForMember(d => d.DailyHighUsd, o => o.MapFrom(s => s.High24H["usd"]));

      this.CreateMap<CoinFullDataById, Posmn.Models.Social>()
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
