import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class SharedModule { }
