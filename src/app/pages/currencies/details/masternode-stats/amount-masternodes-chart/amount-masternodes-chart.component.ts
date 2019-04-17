import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HistoricalData } from 'src/app/coin-info/historical-data.model';

@Component({
  selector: 'app-amount-masternodes-chart',
  templateUrl: './amount-masternodes-chart.component.html',
  styleUrls: ['./amount-masternodes-chart.component.scss']
})
export class AmountMasternodesChartComponent implements OnInit, OnChanges {

  @Input()
  historicalData: HistoricalData[];

  @Input()
  timeframe = '1m';

  dataPoints: number[];
  labels: any[];

  constructor() { }

  ngOnInit() {
    this.buildChart();
  }

  ngOnChanges() {
    this.buildChart();
  }

  buildChart() {
    const days = this.daysFromTimeframe();
    const lastTenPoints = this.historicalData.slice(0, days);
    this.labels = lastTenPoints.map(x => this.toDate(x.date));
    this.dataPoints = lastTenPoints.map(x => x.activeMasternodes);
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
