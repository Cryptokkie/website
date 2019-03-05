import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrenciesModule } from './currencies/currencies.module';

@NgModule({
  imports: [
    CommonModule,
    CurrenciesModule
  ],
  exports: [
    CurrenciesModule
  ]
})
export class PagesModule { }
