import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
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
  timeframe = '10d';

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          parser: 'MM/DD/YYYY',
          tooltipFormat: 'll'
        },
        gridLines: {
          display: true,
          drawBorder: false,
          borderDash: [3, 3],
          color: 'rgb(255,255,255,0.6)'
        },
        ticks: {
          padding: 20,
          fontColor: 'rgb(255,255,255,0.6)'
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 6,
          padding: 20,
          fontColor: 'rgb(255,255,255,0.6)'
        },
        gridLines: {
          display: true,
          drawBorder: false,
          borderDash: [3, 3],
          color: 'rgb(255,255,255,0.6)'
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#fff',
      backgroundColor: '#fff',
      // @ts-ignore
      fill: false
    },
  ];

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
    const labels = lastTenPoints.map(x => this.toDate(x.date));
    const dataPoints = lastTenPoints.map(x => x.activeMasternodes);

    this.lineChartData = [
      { data: dataPoints, label: 'Masternodes' },
    ];
    // @ts-ignore
    this.lineChartLabels = labels;
  }

  toDate(input: string): Date {
    return new Date(+input.substr(0, 4), +input.substr(4, 2) - 1, +input.substr(6, 2));
  }

  // yyyymmdd to d-m
  formatDate(input: string) {
    return this.trimZero(input.substr(6, 2)) + '-' + this.trimZero(input.substr(4, 2));
  }

  trimZero(input: string) {
    return input.replace(new RegExp('^[0]+'), '');
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
