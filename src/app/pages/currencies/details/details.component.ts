import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/coin-info/coin-info.service';
import { Coin } from 'src/app/coin-info/coin.model';
import { AuthService } from 'src/app/core/auth.service';
import { LoaderService } from 'src/app/loader/loader.service';
import { RatingService } from 'src/app/rating/rating.service';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { CoinOverviewComponent } from './coin-overview/coin-overview.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  readonly loadingKey = 'coin-details';
  private sub: any;
  rating: number;

  tabs = {
    'coin-overview': 0,
    'masternode-stats': 1,
    markets: 2,
    reviews: 3
  };
  tabIndex: number;
  coin: Coin;

  @ViewChild('coinOverviewTab') coinOverviewTab: CoinOverviewComponent;

  constructor(
    private coinInfoService: CoinInfoService,
    public auth: AuthService,
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private router: Router,
    public loader: LoaderService,
    private location: Location,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loader.show(this.loadingKey);
    this.sub = this.route.params.subscribe(params => {
      this.coinInfoService.getCoin(params.name)
        .pipe(
          finalize(() => this.loader.hide(this.loadingKey)),
          catchError(err => {
            this.dialog.open(ErrorDialogComponent);
            return throwError(err);
          }),
          tap(x => this.coin = x),
        )
        .subscribe();

      this.ratingService.getAverageRating(params.name)
        .pipe(tap(rating => this.rating = rating !== undefined ? rating.averageRating : 0))
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
    let relativeUrl = this.router.url;

    Object.keys(this.tabs).forEach(x => {
      relativeUrl = relativeUrl.replace(new RegExp('/' + this.escapeRegExp(x) + '$'), '');
    });

    const tab = this.getTabByIndex(index);

    this.location.replaceState(relativeUrl + '/' + tab);
  }

  animationDone() {
    if (this.location.path().endsWith('coin-overview')) {
      this.coinOverviewTab.update();
    }
  }

  getTabByIndex(index: number) {
    return Object.keys(this.tabs).find(key => this.tabs[key] === index);
  }

  escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
}
