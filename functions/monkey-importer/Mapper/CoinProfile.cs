using AutoMapper;
using System;
using System.Linq;

namespace monkey_importer.Mapper
{
  using Models;
  using Posmn.CoinData.Models;

  class MasternodeStatsProfile : Profile
  {
    public MasternodeStatsProfile()
    {
      this.CreateMap<Masternode, MasternodeStats>()
        .ForMember(d => d.ActiveMasternodes, o => o.MapFrom(s => s.Active))
        .ForMember(d => d.Collateral, o => o.MapFrom(s => s.Collateral))
        .ForMember(d => d.DailyReward, o => o.MapFrom(s => s.Coins.Daily))
        .ForMember(d => d.DailyRewardBtc, o => o.MapFrom(s => s.Coins.DailyBtc))
        .ForMember(d => d.DailyRewardUsd, o => o.MapFrom(s => s.Coins.DailyUsd))
        .ForMember(d => d.LockedAmount, o => o.MapFrom(s => s.Locked))
        .ForMember(d => d.LockedPercentage, o => o.MapFrom(s => s.LockedPercentage))
        .ForMember(d => d.MonthlyReward, o => o.MapFrom(s => s.Coins.Monthly))
        .ForMember(d => d.MonthlyRewardBtc, o => o.MapFrom(s => s.Coins.MonthlyBtc))
        .ForMember(d => d.MonthlyRewardUsd, o => o.MapFrom(s => s.Coins.MonthlyUsd))
        .ForMember(d => d.WeeklyReward, o => o.MapFrom(s => s.Coins.Weekly))
        .ForMember(d => d.WeeklyRewardBtc, o => o.MapFrom(s => s.Coins.WeeklyBtc))
        .ForMember(d => d.WeeklyRewardUsd, o => o.MapFrom(s => s.Coins.WeeklyUsd))
        .ForMember(d => d.YearlyReward, o => o.MapFrom(s => s.Coins.Yearly))
        .ForMember(d => d.YearlyRewardBtc, o => o.MapFrom(s => s.Coins.YearlyBtc))
        .ForMember(d => d.YearlyRewardUsd, o => o.MapFrom(s => s.Coins.YearlyUsd))
        .ForMember(d => d.YearlyRoi, o => o.MapFrom(s => s.RoiYear));
    }
  }
}
