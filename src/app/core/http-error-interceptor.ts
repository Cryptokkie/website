import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from '../pages/shared/error-dialog/error-dialog.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(public dialog: MatDialog) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status >= 500) {
                    const data = {
                        reason: error.message,
                        status: error.status
                    };
                    this.dialog.open(ErrorDialogComponent, { data });
                }
                return throwError(error);
            }));
    }
}
