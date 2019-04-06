import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinDetails } from './coin-details.model';
import { CoinInfoModule } from './coin-info.module';

@Injectable({
  providedIn: CoinInfoModule
})
export class CoinInfoService {

  constructor(private httpClient: HttpClient) { }

  getCurrencies(): Observable<CoinStats[]> {
    const functionUrl = 'https://posmn-coin-info.azurewebsites.net/api/currencies'
      + '?code=a3RUUHVaUNvybXmdCo4ebANUkphXbdDHzTOGaFzdf7Jqioy6/5lhqQ==';

    return this.httpClient.get<CoinStats[]>(functionUrl);
  }

  getCurrency(name: string): Observable<CoinDetails> {
    const geckoUrl = `https://api.coingecko.com/api/v3/coins/${name}?localization=false&sparkline=true`;

    return this.httpClient.get<CoinDetails>(geckoUrl);
  }
}
