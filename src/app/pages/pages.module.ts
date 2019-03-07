import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrenciesModule } from './currencies/currencies.module';
import { WorkInProgressModule } from './work-in-progress/work-in-progress.module';

@NgModule({
  imports: [
    CommonModule,
    CurrenciesModule,
    WorkInProgressModule
  ],
  exports: [],
  declarations: []
})
export class PagesModule { }
