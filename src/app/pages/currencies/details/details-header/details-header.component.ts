import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/app/coin-info/coin.model';

@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss']
})
export class DetailsHeaderComponent implements OnInit {

  @Input()
  coin: Coin;

  constructor() { }

  ngOnInit() {
  }

}
