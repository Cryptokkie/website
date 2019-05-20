import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinExchange } from './coin-exchange.model';
import { CoinInfoModule } from './coin-info.module';
import { Coin } from './coin.model';
import { HistoricalData } from './historical-data.model';
import { MasternodeStats } from './masternode-stats.model';

@Injectable({
  providedIn: CoinInfoModule
})
export class CoinInfoService {

  constructor(private httpClient: HttpClient) { }

  getCoins(): Observable<Coin[]> {
    const functionUrl = 'https://posmn-coin-info.azurewebsites.net/api/coins'
      + '?code=F5S/nWSTjVa2lyHRniAOgnfEXSbWLRXOcL6tOoF9lEoAktSW0qTOyA==';

    return this.httpClient.get<Coin[]>(functionUrl);
  }

  getCoin(id: string): Observable<Coin> {
    const functionUrl = 'https://posmn-coin-info.azurewebsites.net/api/coin'
      + `?coinId=${id}`
      + '&code=YRkpwZnU1MwWi0BmURx0C3fkaEj3Eu7q/ndWXSCgrIc3CU9kGSuApA==';

    return this.httpClient.get<Coin>(functionUrl);
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

  getCoinExchanges(id: string): Observable<CoinExchange[]> {
    const functionUrl = 'https://posmn-coin-info.azurewebsites.net/api/coin-exchanges'
      + `?coinId=${id}`
      + '&code=YIXa8RcxLojLxCht8vQxIvXzsasPvSxiqNo3rrsNiJtjRqT60GGmGQ==';

    return this.httpClient.get<CoinExchange[]>(functionUrl);
  }
}
