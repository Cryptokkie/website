import { Component, OnInit, Input } from '@angular/core';
import { CoinDetails } from 'src/app/coin-info/coin-details.model';

@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss']
})
export class DetailsHeaderComponent implements OnInit {

  @Input()
  currency: CoinDetails;

  constructor() { }

  ngOnInit() {
  }

}
