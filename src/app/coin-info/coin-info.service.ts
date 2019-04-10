import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoinInfoModule } from './coin-info.module';
import { Coin } from './coin.model';

@Injectable({
  providedIn: CoinInfoModule
})
export class CoinInfoService {

  constructor(private httpClient: HttpClient) { }

  getCoins(): Observable<Coin[]> {
    const functionUrl = 'https://posmn-coin-info.azurewebsites.net/api/currencies'
      + '?code=a3RUUHVaUNvybXmdCo4ebANUkphXbdDHzTOGaFzdf7Jqioy6/5lhqQ==';

    return this.httpClient.get<Coin[]>(functionUrl);
  }

  getCoin(id: string): Observable<Coin> {
    return this.getCoins()
      .pipe(map(x => x.find(i => i.id === id)));
  }
}
