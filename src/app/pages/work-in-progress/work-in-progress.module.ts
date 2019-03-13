import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { WorkInProgressComponent } from './work-in-progress.component';

@NgModule({
  declarations: [WorkInProgressComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WorkInProgressModule { }
