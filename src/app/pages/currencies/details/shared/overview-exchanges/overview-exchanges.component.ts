import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { finalize, tap } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/coin-info/coin-info.service';
import { Coin } from 'src/app/coin-info/coin.model';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-overview-exchanges',
  templateUrl: './overview-exchanges.component.html',
  styleUrls: ['./overview-exchanges.component.scss']
})
export class OverviewExchangesComponent implements OnInit, OnDestroy {

  readonly loadingKey = 'coin-exchanges';
  private sub: any;

  @Input()
  coin: Coin;

  @Input()
  limit: number;

  displayedColumns: string[] = [
    'exchangeName',
    'pair',
    'lastPriceUsd',
    'volumeUsd'
  ];
  coinExchanges = new MatTableDataSource();

  sort: MatSort;
  paginator: MatPaginator;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(public loader: LoaderService, private coinInfoService: CoinInfoService) { }

  ngOnInit() {
    this.loader.show(this.loadingKey);
    this.sub = this.coinInfoService.getCoinExchanges(this.coin.id)
      .pipe(
        finalize(() => this.loader.hide(this.loadingKey)),
        tap(coinExchanges => {
          if (this.limit) {
            coinExchanges = coinExchanges.slice(0, this.limit);
          }
          this.coinExchanges = new MatTableDataSource(coinExchanges);
          this.setDataSourceAttributes();
        }),
      )
      .subscribe();
  }

  goToExchange(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  setDataSourceAttributes() {
    this.coinExchanges.paginator = this.paginator;
    this.coinExchanges.sort = this.sort;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
