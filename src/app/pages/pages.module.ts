import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrenciesModule } from './currencies/currencies.module';
import { DisclaimerModule } from './disclaimer/disclaimer.module';
import { PrivacyModule } from './privacy/privacy.module';
import { TermsAndConditionsModule } from './terms-and-conditions/terms-and-conditions.module';
import { WorkInProgressModule } from './work-in-progress/work-in-progress.module';

@NgModule({
  imports: [
    CommonModule,
    CurrenciesModule,
    WorkInProgressModule,
    PrivacyModule,
    DisclaimerModule,
    TermsAndConditionsModule
  ],
  exports: [],
  declarations: []
})
export class PagesModule { }
