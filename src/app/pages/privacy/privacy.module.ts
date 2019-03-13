import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PrivacyModule { }
