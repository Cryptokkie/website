import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoinInfoModule } from 'src/app/coin-info/coin-info.module';
import { SharedModule } from '../shared/shared.module';
import { CurrenciesOverviewComponent } from './currencies-overview/currencies-overview.component';
import { CurrenciesComponent } from './currencies.component';
import { DetailsComponent } from './details/details.component';
import { DetailsHeaderComponent } from './details/details-header/details-header.component';

@NgModule({
  declarations: [CurrenciesComponent, CurrenciesOverviewComponent, DetailsComponent, DetailsHeaderComponent],
  imports: [
    CommonModule,
    CoinInfoModule,
    SharedModule,
    RouterModule
  ]
})
export class CurrenciesModule { }
