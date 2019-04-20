import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

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
  barDataPoints: number[];

  @Input()
  labels: any[];

  @Input()
  colorStyle = 'light'; // light|dark

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: (tooltipItem, data) => {
            let label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': ';
            }
            label += (tooltipItem.yLabel as number).toFixed(2);
            return label;
        }
    }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
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
          maxTicksLimit: 6,
          padding: 20,
          fontColor: 'rgb(255,255,255,0.6)'
        }
      }],
      yAxes: [{
        id: 'line',
        position: 'left',
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
        },
      },
      {
        beforeFit: (scale) => {
          scale.options.ticks.max = Math.max.apply(null, this.barDataPoints) * 5;
        },
        id: 'bar',
        position: 'right',
        ticks: {
          display: false,
          min: 0
        },
        gridLines: {
          display: false
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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
    this.buildChart();
  }

  ngOnChanges() {
    this.buildChart();
  }

  buildChart() {

    const rgbColor = this.colorStyle === 'dark' ? 'rgb(0,0,0,0.35)' : 'rgb(255,255,255,0.6)';
    const hexColor = this.colorStyle === 'dark' ? '#333' : '#fff';

    this.lineChartOptions.scales.xAxes[0].gridLines.color = rgbColor;
    this.lineChartOptions.scales.xAxes[0].ticks.fontColor = rgbColor;
    this.lineChartOptions.scales.yAxes[0].gridLines.color = rgbColor;
    this.lineChartOptions.scales.yAxes[0].ticks.fontColor = rgbColor;
    this.lineChartColors[0].borderColor = hexColor;
    this.lineChartColors[0].backgroundColor = hexColor;

    this.lineChartData = [
      {
        type: 'line',
        label: 'Price',
        data: this.dataPoints,
        yAxisID: 'line'
      }
    ];

    if (this.barDataPoints) {
      this.lineChartData.push({
        type: 'bar',
        label: 'Volume',
        backgroundColor: 'rgb(255,255,255,0.35)',
        hoverBackgroundColor: 'rgb(255,255,255,0.5)',
        data: this.barDataPoints,

        yAxisID: 'bar'
      });

      this.chart.update();
    }
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
