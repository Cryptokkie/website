import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input()
  height;

  @Input()
  width;

  @Input()
  dataPoints: number[];

  @Input()
  labels: any[];

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
    this.lineChartData = [
      { data: this.dataPoints },
    ];
    // @ts-ignore
    this.lineChartLabels = this.labels;
  }

  heightInPx() {
    return this.height + 'px';
  }

  widthInPx() {
    return this.width + 'px';
  }
}
