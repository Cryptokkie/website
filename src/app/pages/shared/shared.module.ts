import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { LoaderModule } from '../../loader/loader.module';
import { MaterialModule } from '../../material/material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PageContentComponent } from './page-content/page-content.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PercentageComponent } from './percentage/percentage.component';
import { PrettyLinkPipe } from './pretty-link.pipe';

@NgModule({
  declarations: [PageHeaderComponent, PageContentComponent, PercentageComponent, PrettyLinkPipe, LineChartComponent, ErrorDialogComponent],
  entryComponents: [ErrorDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LoaderModule,
    ChartsModule,
    RouterModule
  ],
  exports: [
    PageHeaderComponent,
    PageContentComponent,
    PercentageComponent,
    LineChartComponent,
    PrettyLinkPipe,
    FlexLayoutModule,
    MaterialModule,
    LoaderModule,
    ChartsModule
  ]
})
export class SharedModule { }
