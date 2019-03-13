import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import { PageContentComponent } from './page-content/page-content.component';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  declarations: [PageHeaderComponent, PageContentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    PageHeaderComponent,
    PageContentComponent,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class SharedModule { }
