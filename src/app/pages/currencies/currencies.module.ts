import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CurrenciesOverviewComponent } from './currencies-overview/currencies-overview.component';
import { CurrenciesComponent } from './currencies.component';

@NgModule({
  declarations: [CurrenciesComponent, CurrenciesOverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class CurrenciesModule { }
