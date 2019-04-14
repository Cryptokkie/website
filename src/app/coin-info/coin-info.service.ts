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
      + '?code=a3RUUHVaUNvybXmdCo4ebANUkphXbdDHzTOGaFzdf7Jqioy6/5lhqQ==';

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
      + '&code=8rGh6F5Z0zd5daWGXt24kXWaPnzaM9C4rQr0gQsnk6JSm50dWYmL0A==';

    return this.httpClient.get<MasternodeStats>(functionUrl);
  }

  getHistoricalData(id: string): Observable<HistoricalData[]> {
    const functionUrl = 'https://posmn-coin-info.azurewebsites.net/api/historical-data'
      + `?coinId=${id}`
      + '&code=A0sV/TIXrynO/vu6PepfpUQRiaSQ5LCYE90f2qcXBuDyLh6vaNUAgQ==';

    return this.httpClient.get<HistoricalData[]>(functionUrl);
  }
}
