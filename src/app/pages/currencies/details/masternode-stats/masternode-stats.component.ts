import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/coin-info/coin-info.service';
import { Coin } from 'src/app/coin-info/coin.model';
import { HistoricalData } from 'src/app/coin-info/historical-data.model';
import { MasternodeStats } from 'src/app/coin-info/masternode-stats.model';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-masternode-stats',
  templateUrl: './masternode-stats.component.html',
  styleUrls: ['./masternode-stats.component.scss']
})
export class MasternodeStatsComponent implements OnInit, OnDestroy {

  private sub: any;
  readonly loadingKey = 'masternode-stats';

  @Input()
  coin: Coin;
  masternodeStats: MasternodeStats;
  historicalData: HistoricalData[];

  // 1m|3m|1y
  masternodesChartTimeframe = '1m';

  constructor(private coinInfoService: CoinInfoService, public loader: LoaderService) { }

  ngOnInit() {

    this.loader.show(this.loadingKey);

    const masternodeStats = this.coinInfoService.getMasternodeStats(this.coin.id)
      .pipe(tap(x => this.masternodeStats = x));

    const historicalData = this.coinInfoService.getHistoricalData(this.coin.id)
      .pipe(tap(x => this.historicalData = x));

    this.sub = forkJoin(masternodeStats, historicalData)
      .pipe(finalize(() => this.loader.hide(this.loadingKey)))
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  dailyActiveMasternodePercentage(): number {
    const today = this.historicalData[0].activeMasternodes;
    const yesterday = this.historicalData[1].activeMasternodes;
    return (today - yesterday) / yesterday * 100;
  }

  dailyIncomePercentageUsd(): number {
    const today = this.historicalData[0].dailyRewardUsd;
    const yesterday = this.historicalData[1].dailyRewardUsd;
    return (today - yesterday) / yesterday * 100;
  }
}
