import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/coin-info/coin-info.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-currencies-overview',
  templateUrl: './currencies-overview.component.html',
  styleUrls: ['./currencies-overview.component.scss']
})
export class CurrenciesOverviewComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'lastPriceCurrency',
    'dailyChangePercentage',
    'dailyVolumeCurrency',
    'supply',
    'marketcap'];
  currencies: MatTableDataSource<CoinStats>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private coinInfoService: CoinInfoService,
    public loader: LoaderService) { }

  ngOnInit() {

    this.loader.show();
    this.coinInfoService.getCurrencies()
      .pipe(
        finalize(() => this.loader.hide()),
        catchError(err => {
          // show error dialog
          return throwError(err);
        }),
        tap(currencies => {
          this.currencies = new MatTableDataSource(currencies);
          this.currencies.sort = this.sort;
        })
      )
      .subscribe();
  }

}
