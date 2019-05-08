using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace coingecko_importer.Mapper
{
  class CoinExchangesProfile : Profile
  {
    public CoinExchangesProfile()
    {
      this.CreateMap<CoinGecko.Entities.Response.Shared.Ticker, Posmn.CoinData.Models.CoinExchange>()
        .ForMember(d => d.ExchangeName, o => o.MapFrom(s => s.Market.Name))
        .ForMember(d => d.ExchangeIdentifier, o => o.MapFrom(s => s.Market.Identifier))
        .ForMember(d => d.Url, o => o.MapFrom(s => s.TradeUrl))
        .ForMember(d => d.LastPriceBtc, o => o.MapFrom(s =>
          s.ConvertedLast.ContainsKey("btc") ? double.Parse(s.ConvertedLast["btc"]) : 0))
        .ForMember(d => d.LastPriceUsd, o => o.MapFrom(s =>
          s.ConvertedLast.ContainsKey("usd") ? double.Parse(s.ConvertedLast["usd"]) : 0))
        .ForMember(d => d.VolumeBtc, o => o.MapFrom(s =>
          s.ConvertedVolume.ContainsKey("btc") ? double.Parse(s.ConvertedVolume["btc"]) : 0))
        .ForMember(d => d.VolumeUsd, o => o.MapFrom(s =>
          s.ConvertedVolume.ContainsKey("usd") ? double.Parse(s.ConvertedVolume["usd"]) : 0));
    }
  }
}
