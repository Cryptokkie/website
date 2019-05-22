import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from './rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private httpClient: HttpClient) { }

  addRating(rating: Rating) {
    const functionUrl = 'https://posmn-rating.azurewebsites.net/api/rating'
      + '?code=qMSVD7rgbaqIwlcAZgm/C024eHhQawBhWH/izmmOzwBY/o31Vyt4wg==';

    const accessToken = localStorage.getItem('access_token');

    return this.httpClient.post(functionUrl, rating,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }
    );
  }

  getAverageRating(coinId: string): Observable<Rating> {
    const functionUrl = 'https://posmn-rating.azurewebsites.net/api/average-rating'
      + '?code=I/E/pfbdgZjMFEShMbaIYQ7rJifg1S1ijWqnFXn3a2bCstHuWHnN8A=='
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
