import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/coin-info/coin-info.service';
import { Coin } from 'src/app/coin-info/coin.model';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  readonly loadingKey = 'coin-details';
  private sub: any;

  tabs = {
    'coin-overview': 0,
    'masternode-stats': 1,
    'pos-stats': 2,
    'pos-pools': 3,
    'masternode-hosting': 4,
    // tslint:disable-next-line:object-literal-key-quotes
    'marketing': 5
  };
  tabIndex: number;
  coin: Coin;

  @ViewChild('tabCoinOverview') tabCoinOverview: MatTab;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  constructor(
    private coinInfoService: CoinInfoService,
    private route: ActivatedRoute,
    private router: Router,
    public loader: LoaderService,
    private location: Location) { }

  ngOnInit() {
    this.loader.show(this.loadingKey);
    this.sub = this.route.params.subscribe(params => {
      this.coinInfoService.getCoin(params.name)
        .pipe(
          finalize(() => this.loader.hide(this.loadingKey)),
          catchError(err => {
            // show error dialog
            return throwError(err);
          }),
          tap(x => this.coin = x),
        )
        .subscribe();

      if (params.tab) {
        this.tabIndex = this.tabs[params.tab];
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  tabIndexChange(index: number) {
    this.location.replaceState(this.router.url + '/' + this.getTabByIndex(index));
  }

  getTabByIndex(index: number) {
    return Object.keys(this.tabs).find(key => this.tabs[key] === index);
  }
}
