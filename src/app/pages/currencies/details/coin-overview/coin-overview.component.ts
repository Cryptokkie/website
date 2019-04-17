import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/app/coin-info/coin.model';

@Component({
  selector: 'app-coin-overview',
  templateUrl: './coin-overview.component.html',
  styleUrls: ['./coin-overview.component.scss']
})
export class CoinOverviewComponent implements OnInit {

  @Input()
  coin: Coin;

  // 1d|1m|3m|1y
  priceChartTimeframe = '1d';

  constructor() { }

  ngOnInit() {
  }

}
