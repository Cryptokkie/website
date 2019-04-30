import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoinInfoModule } from './coin-info.module';
import { Coin } from './coin.model';
import { HistoricalData } from './historical-data.model';
import { MasternodeStats } from './masternode-stats.model';

@Injectable({
  providedIn: CoinInfoModule
})
export class CoinInfoService {

  constructor(private httpClient: HttpClient) { }

  // TODO: deliver basic info here
  getCoins(): Observable<Coin[]> {
    const functionUrl = 'https://posmn-coin-info.azurewebsites.net/api/currencies'
      + '?code=8djNoJ3fA9ik8Nkpv0Rb0R0MBlyTWaXO2v6Xy5tesmn80iez6326wg==';

    return this.httpClient.get<Coin[]>(functionUrl);
  }

  // TODO: deliver specific info here
  getCoin(id: string): Observable<Coin> {
    return this.getCoins()
      .pipe(map(x => x.find(i => i.id === id)));
  }

  getMasternodeStats(id: string): Observable<MasternodeStats> {
    const functionUrl = 'https://posmn-coin-info.azurewebsites.net/api/masternode-stats'
      + `?coinId=${id}`
      + '&code=aBbgEaE0dNjCKsR/Dz9yQqOskld6YvChxNuozcwVOYxUeZzik2ZgQw==';

    return this.httpClient.get<MasternodeStats>(functionUrl);
  }

  getHistoricalData(id: string): Observable<HistoricalData[]> {
    const functionUrl = 'https://posmn-coin-info.azurewebsites.net/api/historical-data'
      + `?coinId=${id}`
      + '&code=8wqdHGfPKdy2PFfpaXpjUODuHha/qTWvXZc9api6ca0Gssp/fNTXAw==';

    return this.httpClient.get<HistoricalData[]>(functionUrl);
  }
}
