import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TermsAndConditionsModule { }
