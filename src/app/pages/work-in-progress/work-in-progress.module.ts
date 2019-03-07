import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WorkInProgressComponent } from './work-in-progress.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [WorkInProgressComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class WorkInProgressModule { }
