import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpErrorInterceptor } from './http-error-interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
