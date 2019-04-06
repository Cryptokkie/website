import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
    'marketcap'
  ];
  currencies = new MatTableDataSource([{name: '1'}, { name: '2'}]);

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
          this.setDataSourceAttributes();
        })
      )
      .subscribe();
  }

  setDataSourceAttributes() {
    this.currencies.paginator = this.paginator;
    this.currencies.sort = this.sort;
  }
}
