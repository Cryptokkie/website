import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/coin-info/coin-info.service';
import { Coin } from 'src/app/coin-info/coin.model';
import { MasternodeStats } from 'src/app/coin-info/masternode-stats.model';

@Component({
  selector: 'app-masternode-stats',
  templateUrl: './masternode-stats.component.html',
  styleUrls: ['./masternode-stats.component.scss']
})
export class MasternodeStatsComponent implements OnInit, OnDestroy {

  private sub: any;
  public loading = true;

  @Input()
  coin: Coin;
  masternodeStats: MasternodeStats;

  constructor(private coinInfoService: CoinInfoService) { }

  ngOnInit() {
    this.sub = this.coinInfoService.getMasternodeStats(this.coin.id)
      .pipe(
        tap(x => this.masternodeStats = x),
        finalize(() => this.loading = false)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
