import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Coin } from 'src/app/coin-info/coin.model';

@Component({
  selector: 'app-coin-overview',
  templateUrl: './coin-overview.component.html',
  styleUrls: ['./coin-overview.component.scss']
})
export class CoinOverviewComponent implements OnInit, AfterViewInit {

  @Input()
  coin: Coin;

  panelOpen: boolean;

  @ViewChild('twitterEmbed') twitterEmbed: ElementRef;

  // 1d|1m|3m|1y
  priceChartTimeframe = '1d';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initTwitterWidget();
  }

  update() {
    this.initTwitterWidget();
  }

  initTwitterWidget() {

    this.twitterEmbed.nativeElement.innerHTML = '';
    this.twitterEmbed.nativeElement.insertAdjacentHTML('beforeend', '<a class="twitter-timeline" href="'
      + this.coin.social.twitterLink + '" data-tweet-limit="3"></a>');

    (window as any).twttr = ((d, s, id) => {
      let js: any;
      const fjs = d.getElementsByTagName(s)[0];
      const t = (window as any).twttr || {};
      if (d.getElementById(id)) { return t; }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = (f: any) => {
        t._e.push(f);
      };

      return t;
    })(document, 'script', 'twitter-wjs');

    if ((window as any).twttr.ready()) {
      (window as any).twttr.widgets.load();
    }

  }
}
