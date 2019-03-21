import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';
import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
