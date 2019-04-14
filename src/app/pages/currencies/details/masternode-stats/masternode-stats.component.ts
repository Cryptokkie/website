import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/coin-info/coin-info.service';
import { Coin } from 'src/app/coin-info/coin.model';
import { HistoricalData } from 'src/app/coin-info/historical-data.model';
import { MasternodeStats } from 'src/app/coin-info/masternode-stats.model';

@Component({
  selector: 'app-masternode-stats',
  templateUrl: './masternode-stats.component.html',
  styleUrls: ['./masternode-stats.component.scss']
})
export class MasternodeStatsComponent implements OnInit, OnDestroy {

  private masternodeStatsSubscriber: any;
  private historicalDataSubscriber: any;
  public loading = true;

  @Input()
  coin: Coin;
  masternodeStats: MasternodeStats;
  historicalData: HistoricalData[];

  constructor(private coinInfoService: CoinInfoService) { }

  ngOnInit() {

    this.masternodeStatsSubscriber = this.coinInfoService.getMasternodeStats(this.coin.id)
      .pipe(tap(x => this.masternodeStats = x));

    this.historicalDataSubscriber = this.coinInfoService.getHistoricalData(this.coin.id)
      .pipe(tap(x => this.historicalData = x));

    forkJoin(this.masternodeStatsSubscriber, this.historicalDataSubscriber)
        .pipe(finalize(() => this.loading = false))
        .subscribe();
  }

  ngOnDestroy() {
    this.masternodeStatsSubscriber.unsubscribe();
    this.historicalDataSubscriber.unsubscribe();
  }
}
