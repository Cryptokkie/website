using AutoMapper;
using System;
using System.Linq;

namespace monkey_importer.Mapper
{
  using Models;
  using Posmn.CoinData.Models;

  class DataPointProfile : Profile
  {
    public DataPointProfile()
    {
      this.CreateMap<Masternode, DataPoint>()
        .ForMember(d => d.ActiveMasternodes, o => o.MapFrom(s => s.Active))
        .ForMember(d => d.DailyRewardBtc, o => o.MapFrom(s => s.Coins.DailyBtc))
        .ForMember(d => d.DailyRewardUsd, o => o.MapFrom(s => s.Coins.DailyUsd));
    }
  }
}
