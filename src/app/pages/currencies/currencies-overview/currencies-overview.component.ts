import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { CoinInfoService } from 'src/app/coin-info/coin-info.service';

@Component({
  selector: 'app-currencies-overview',
  templateUrl: './currencies-overview.component.html',
  styleUrls: ['./currencies-overview.component.scss']
})
export class CurrenciesOverviewComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'lastPriceBtc',
    'dailyChange',
    'dailyVolumeBtc',
    'supply',
    'marketcap'];
  currencies: MatTableDataSource<CoinStats>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private coinInfoService: CoinInfoService) { }

  ngOnInit() {
    this.coinInfoService.getCurrencies().subscribe(currencies => {
      this.currencies = new MatTableDataSource(currencies);
      this.currencies.sort = this.sort;
    });
  }

}
