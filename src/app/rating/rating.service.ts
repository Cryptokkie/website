import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { Rating } from './rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  ratingsFunctionUrl = 'https://posmn-rating.azurewebsites.net/api/ratings'
    + '?code=9geYnBLLnI1QVQ11xitVI2pCo2LnqYZSH3qa4bqkfmttO/5NEspKsw==';
  ratingFunctionUrl = 'https://posmn-rating.azurewebsites.net/api/rating'
    + '?code=qMSVD7rgbaqIwlcAZgm/C024eHhQawBhWH/izmmOzwBY/o31Vyt4wg==';
  averageRatingFunctionUrl = 'https://posmn-rating.azurewebsites.net/api/average-rating'
    + '?code=I/E/pfbdgZjMFEShMbaIYQ7rJifg1S1ijWqnFXn3a2bCstHuWHnN8A==';
  userRatingFunctionUrl = 'https://posmn-rating.azurewebsites.net/api/user-rating'
    + '?code=YtdouQN/51VyKWgfgBhAeMzzEuiHaxe0Vq1m3IUsZ/zx49JEdUX9Ig==';

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  addRating(rating: Rating) {
    return this.httpClient.post(this.ratingFunctionUrl, rating, { headers: this.auth.authHeaders() });
  }

  getAverageRating(coinId: string): Observable<Rating> {
    const functionUrl = this.averageRatingFunctionUrl
      + `&coinId=${coinId}`;

    return this.httpClient
      .get<Rating>(functionUrl, { headers: this.auth.authHeaders() })
      .pipe(catchError(this.ignore404));
  }

  getRatings(coinId: string): Observable<Rating[]> {
    const functionUrl = this.ratingsFunctionUrl
      + `&coinId=${coinId}`;

    return this.httpClient
      .get<Rating[]>(functionUrl)
      .pipe(catchError(this.ignore404));
  }

  getTopRatings(coinId: string): Observable<Rating[]> {
    const functionUrl = this.ratingsFunctionUrl
      + `&coinId=${coinId}&order=top&limit=4`;

    return this.httpClient
      .get<Rating[]>(functionUrl)
      .pipe(catchError(this.ignore404));
  }

  getBadRatings(coinId: string): Observable<Rating[]> {
    const functionUrl = this.ratingsFunctionUrl
      + `&coinId=${coinId}&order=bad&limit=2`;

    return this.httpClient
      .get<Rating[]>(functionUrl)
      .pipe(catchError(this.ignore404));
  }

  getUserRating(coinId: string): Observable<Rating> {
    const functionUrl = this.userRatingFunctionUrl
      + `&coinId=${coinId}`;

    return this.httpClient
      .get<Rating>(functionUrl, { headers: this.auth.authHeaders() })
      .pipe(catchError(this.ignore404));
  }

  private ignore404(error: HttpErrorResponse) {
    if (error.status === 404) {
      // A client-side or network error occurred. Handle it accordingly.
      return of(undefined);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

}
