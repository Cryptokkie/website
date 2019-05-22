import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private httpClient: HttpClient) { }

  addRating(rating: Rating) {
    const accessToken = localStorage.getItem('access_token');

    return this.httpClient.post(this.ratingFunctionUrl, rating,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }
    );
  }

  getAverageRating(coinId: string): Observable<Rating> {
    const functionUrl = this.averageRatingFunctionUrl
      + `&coinId=${coinId}`;

    const accessToken = localStorage.getItem('access_token');

    return this.httpClient.get<Rating>(functionUrl,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }
    );
  }

  getRatings(coinId: string): Observable<Rating[]> {
    const functionUrl = this.ratingsFunctionUrl
      + `&coinId=${coinId}`;

    return this.httpClient.get<Rating[]>(functionUrl);
  }

  getTopRatings(coinId: string): Observable<Rating[]> {
    const functionUrl = this.ratingsFunctionUrl
      + `&coinId=${coinId}&order=top&limit=4`;

    return this.httpClient.get<Rating[]>(functionUrl);
  }

  getBadRatings(coinId: string): Observable<Rating[]> {
    const functionUrl = this.ratingsFunctionUrl
      + `&coinId=${coinId}&order=bad&limit=2`;

    return this.httpClient.get<Rating[]>(functionUrl);
  }

  getUserRating(coinId: string): Observable<Rating> {
    const functionUrl = this.userRatingFunctionUrl
      + `&coinId=${coinId}`;

    const accessToken = localStorage.getItem('access_token');

    return this.httpClient.get<Rating>(functionUrl,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }
    );
  }
}
