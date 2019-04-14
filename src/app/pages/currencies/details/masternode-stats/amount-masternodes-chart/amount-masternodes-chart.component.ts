import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HistoricalData } from 'src/app/coin-info/historical-data.model';

@Component({
  selector: 'app-amount-masternodes-chart',
  templateUrl: './amount-masternodes-chart.component.html',
  styleUrls: ['./amount-masternodes-chart.component.scss']
})
export class AmountMasternodesChartComponent implements OnInit {

  @Input()
  historicalData: HistoricalData[];

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Amount of Masternodes'
    },
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
          display: false,
          drawBorder: false
        },
        ticks: {
          padding: 20
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 6,
          padding: 20
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#ffc107',
      backgroundColor: '#ffc107',
      // @ts-ignore
      fill: false
    },
  ];

  constructor() { }

  ngOnInit() {

    const lastTenPoints = this.historicalData.slice(0, 10);
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
}
