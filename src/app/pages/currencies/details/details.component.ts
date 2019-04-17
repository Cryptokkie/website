import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  coin: Coin;

  constructor(
    private coinInfoService: CoinInfoService,
    private route: ActivatedRoute,
    public loader: LoaderService) { }

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
          tap(x => this.coin = x)
        )
        .subscribe();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
