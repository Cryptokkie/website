import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Coin } from 'src/app/coin-info/coin.model';

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

  dataPoints: number[];
  labels: any[];

  sub: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.buildChart();
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
      .get<{prices: number[][]}>(`https://api.coingecko.com/api/v3/coins/${this.coin.id}/market_chart?vs_currency=usd&days=${days}`)
      .pipe(tap(data => {
        const amountOfDataPointsToShow = 30; // amount of data points on the chart
        const mod = data.prices.length / amountOfDataPointsToShow;
        let slice = data.prices;

        if (slice.length > amountOfDataPointsToShow) {
          slice = data.prices
            .filter((val, index) =>
              index % Math.trunc(mod) === 0 // only give certain amount of samples
              || index === data.prices.length); // always give the last item
        }

        this.labels = slice.map(x => new Date(x[0]));
        this.dataPoints = slice.map(x => x[1]);
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
