import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CanActivate, Router } from '@angular/router';
import { WebAuth } from 'auth0-js';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationCallbackActivateGuard implements CanActivate {

    constructor(
        private router: Router,
        private location: Location,
        private auth: AuthService,
        private snackBar: MatSnackBar) { }

    canActivate() {
        const path = this.location.path(true);

        const error = this.getParam('error');

        // verify email message for example
        if (error) {
            const errorDescription = decodeURIComponent(this.getParam('error_description'));
            this.snackBar.open(errorDescription, 'OK', { verticalPosition: 'top' });
        }

        const webAuth = new WebAuth({
            domain: environment.auth0.domain,
            clientID: environment.auth0.clientId
        });

        if (this.getParam('access_token')) {

            webAuth.parseHash({ hash: window.location.hash }, (authErr, authResult) => {
                if (authErr) {
                  return console.log(authErr);
                }

                if (localStorage.getItem('linking') === 'linking') {
                    // The "Link Account" method first saves the "linking" item and then authenticates
                    // We identify that flow here, so after each subsequent log-in, we link the accounts
                    localStorage.removeItem('linking');
                    this.auth.linkAccount(authResult.idToken)
                        .pipe(catchError(err => {
                            this.auth.onAuthenticated.error(err);

                            return throwError(err);
                        }))
                        .subscribe(() => {
                            this.auth.onAuthenticated.emit(null);
                            this.router.navigate(['/account']);
                        });
                } else {

                    localStorage.setItem('access_token', authResult.accessToken);
                    localStorage.setItem('id_token', authResult.idToken);
                    localStorage.setItem('user_id', authResult.idTokenPayload.sub);

                    this.auth.onAuthenticated.emit(null);

                    const returnUrl = localStorage.getItem('returnUrl');
                    if (returnUrl) {
                        this.router.navigate([returnUrl]);
                    } else {
                        this.router.navigate([''], { fragment: path });
                    }
                }


                // webAuth.client.userInfo(authResult.accessToken, (err, user) => {
                //   // Now you have the user's information
                // });
              });

            return false;
        }
        return true;
    }

    getParam(name: string) {
        const results = new RegExp('[\\?&#]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results) {
            return '';
        }
        return results[1] || '';
    }
}
