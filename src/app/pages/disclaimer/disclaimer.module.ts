import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DisclaimerComponent } from './disclaimer.component';

@NgModule({
  declarations: [DisclaimerComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DisclaimerModule { }
