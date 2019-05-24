import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { forkJoin, of } from 'rxjs';
import { filter, finalize, tap } from 'rxjs/operators';
import { Coin } from 'src/app/coin-info/coin.model';
import { AuthService } from 'src/app/core/auth.service';
import { LoaderService } from 'src/app/loader/loader.service';
import { Rating } from 'src/app/rating/rating';
import { RatingService } from 'src/app/rating/rating.service';

@Component({
  selector: 'app-coin-reviews',
  templateUrl: './coin-reviews.component.html',
  styleUrls: ['./coin-reviews.component.scss']
})
export class CoinReviewsComponent implements OnInit, OnDestroy {

  private sub: any;
  readonly loadingKey = 'coin-reviews';

  userRating: FormGroup;

  @Input()
  coin: Coin;
  averageRating = new Rating();
  topRatings: Rating[];
  badRatings: Rating[];

  constructor(
    private snackBar: MatSnackBar,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private ratingService: RatingService,
    public loader: LoaderService) { }

  ngOnInit() {

    this.loader.show(this.loadingKey);

    this.userRating = this.formBuilder.group({
      comment: '',
      communityRating: 0,
      productRating: 0,
      teamRating: 0,
      walletRating: 0
    });

    const getAverageRatingObs = this.ratingService.getAverageRating(this.coin.id)
      .pipe(
        filter(rating => !!rating),
        tap(rating => this.averageRating = rating)
      );

    const getTopRatingsObs = this.ratingService.getTopRatings(this.coin.id)
      .pipe(
        filter(rating => !!rating),
        tap(ratings => this.topRatings = ratings)
      );

    const getBadRatingsObs = this.ratingService.getBadRatings(this.coin.id)
      .pipe(
        filter(rating => !!rating),
        tap(ratings => this.badRatings = ratings)
      );

    let getUserRatingObs = of({});
    if (this.auth.isAuthenticated()) {
      getUserRatingObs = this.ratingService.getUserRating(this.coin.id)
        .pipe(tap(rating => this.userRating.patchValue(rating)));
    }

    this.sub = forkJoin(
      getAverageRatingObs,
      getTopRatingsObs,
      getBadRatingsObs,
      getUserRatingObs)
      .pipe(finalize(() => this.loader.hide(this.loadingKey)))
      .subscribe();



  }

  submit() {

    const rating = this.userRating.value as Rating;
    rating.coinId = this.coin.id;
    this.ratingService.addRating(rating)
      .pipe(finalize(() => {
        this.userRating.markAsUntouched();
        this.snackBar.open('Review saved.', null, {
          duration: 3000,
        });
      }))
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
