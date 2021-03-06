import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { ContactModule } from './contact/contact.module';
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
    TermsAndConditionsModule,
    ContactModule,
    AccountModule
  ],
  exports: [],
  declarations: []
})
export class PagesModule { }
