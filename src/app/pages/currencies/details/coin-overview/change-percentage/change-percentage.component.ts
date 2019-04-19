import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-percentage',
  templateUrl: './change-percentage.component.html',
  styleUrls: ['./change-percentage.component.scss']
})
export class ChangePercentageComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  usdValue: number;

  @Input()
  btcValue: number;

  constructor() { }

  ngOnInit() {
  }

}
