import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, finalize, catchError } from 'rxjs/operators';
import { CoinDetails } from 'src/app/coin-info/coin-details.model';
import { CoinInfoService } from 'src/app/coin-info/coin-info.service';
import { LoaderService } from 'src/app/loader/loader.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private sub: any;

  currency: CoinDetails;

  constructor(
    private coinInfoService: CoinInfoService,
    private route: ActivatedRoute,
    public loader: LoaderService) { }

  ngOnInit() {
    this.loader.show();
    this.sub = this.route.params.subscribe(params => {
      this.coinInfoService.getCurrency(params.name)
        .pipe(
          finalize(() => this.loader.hide()),
          catchError(err => {
            // show error dialog
            return throwError(err);
          }),
          tap(x => this.currency = x)
        )
        .subscribe();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
