import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Coin } from 'src/app/coin-info/coin.model';
import { GeckoChartData } from './gecko-chart-data.model';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss']
})
export class PriceChartComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  coin: Coin;

  @Input()
  timeframe = '1d';

  prices: number[];
  labels: any[];

  volumes: number[];

  sub: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // this.buildChart();
  }

  ngOnChanges() {
    this.buildChart();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  buildChart() {
    const days = this.daysFromTimeframe();

    this.sub = this.httpClient
      .get<GeckoChartData>(`https://api.coingecko.com/api/v3/coins/${this.coin.id}/market_chart?vs_currency=usd&days=${days}`)
      .pipe(tap(data => {
        const amountOfDataPointsToShow = 30; // amount of data points on the chart
        const mod = data.prices.length / amountOfDataPointsToShow;
        let slice = data.prices;

        // if length of array is too big the pick only 30 items
        if (slice.length > amountOfDataPointsToShow) {
          slice = data.prices
            .filter((val, index) =>
              index % Math.trunc(mod) === 0 // only give certain amount of samples
              || index === data.prices.length); // always give the last item
        }

        // sort on timestamp
        slice = slice.sort((a, b) => (a[0] > b[0]) ? 1 : -1);

        // get timestamps
        const timestamps = slice.map(x => x[0]);
        this.labels = timestamps.map(timestamp => new Date(timestamp));
        this.prices = slice.map(x => x[1]);
        this.volumes = data.total_volumes
          .filter(x => timestamps.includes(x[0]))
          .map(x => x[1]);
      }))
      .subscribe();
  }

  toDate(input: string): Date {
    return new Date(+input.substr(0, 4), +input.substr(4, 2) - 1, +input.substr(6, 2));
  }

  daysFromTimeframe(): number {
    const timechar = this.timeframe[this.timeframe.length - 1];
    const amount = parseInt(this.timeframe, 10);
    let multiplier = 1;
    switch (timechar) {
      case 'd':
        multiplier = 1;
        break;
      case 'm':
        multiplier = 30;
        break;
      case 'y':
        multiplier = 365;
        break;
      default:
        break;
    }

    return amount * multiplier;
  }

}
