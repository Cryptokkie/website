import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderModule } from '../../loader/loader.module';
import { MaterialModule } from '../../material/material.module';
import { PageContentComponent } from './page-content/page-content.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PercentageComponent } from './percentage/percentage.component';
import { PrettyLinkPipe } from './pretty-link.pipe';

@NgModule({
  declarations: [PageHeaderComponent, PageContentComponent, PercentageComponent, PrettyLinkPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LoaderModule
  ],
  exports: [
    PageHeaderComponent,
    PageContentComponent,
    PercentageComponent,
    PrettyLinkPipe,
    FlexLayoutModule,
    MaterialModule,
    LoaderModule
  ]
})
export class SharedModule { }
