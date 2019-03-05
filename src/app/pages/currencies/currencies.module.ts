import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CurrenciesComponent } from './currencies/currencies.component';
import { MaterialModule } from '../../material/material.module';
import { CurrenciesOverviewComponent } from './currencies-overview/currencies-overview.component';

@NgModule({
  declarations: [CurrenciesComponent, CurrenciesOverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class CurrenciesModule { }
