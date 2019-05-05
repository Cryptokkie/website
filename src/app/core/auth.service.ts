import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Auth0Lock from 'auth0-lock';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  responseType = 'token id_token';
  audience = `https://${environment.auth0.domain}/api/v2/`;
  scope = 'read:current_user update:current_user_identities '
    + 'create:current_user_metadata update:current_user_metadata '
    + 'delete:current_user_metadata create:current_user_device_credentials '
    + 'delete:current_user_device_credentials delete:current_user';

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    {
      avatar: null,
      theme: {
        logo: '/assets/favicon.png',
        primaryColor: '#009688'
      },
      languageDictionary: {
        title: 'Log in to posmn.com',
        signupTitle: 'Sign up to posmn.com'
      },
      auth: {
        redirectUrl: environment.auth0.callbackUrl,
        sso: false,
        responseType: this.responseType,
        audience: this.audience,
        params: {
          scope: this.scope
        }
      },
      allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2', 'twitter'],
      autoclose: true,
      oidcConformant: true,
      loginAfterSignup: false
    }
  );

  onAuthenticated: EventEmitter<any> = new EventEmitter();
  onExpired: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router, private httpClient: HttpClient) {

    this.lock.on('show', () => {
      localStorage.setItem('returnUrl', this.router.url);
    });

  }

  login(): void {
    this.lock.show();
  }

  signUp(): void {
    this.lock.show({ initialScreen: 'signUp' });
  }

  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('user_id');
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  link(provider: string) {
    localStorage.setItem('linking', 'linking');
    // Instantiates Lock, to get an id_token that will be then used to link the account
    const opts = {
      avatar: null,
      theme: {
        logo: '/assets/favicon.png',
        primaryColor: '#009688'
      },
      languageDictionary: {
        title: 'Link your account'
      },
      rememberLastLogin: false,
      auth: {
        responseType: 'token id_token',
        sso: false,
        audience: this.audience,
        params: {
          scope: this.scope
        }
      },
      dict: {
        signin: {
          title: 'Link another account'
        }
      },
      allowedConnections: [provider],
      autoclose: true,
      oidcConformant: true
    };

    this.lock = new Auth0Lock(
      environment.auth0.clientId,
      environment.auth0.domain,
      opts);

    this.lock.show();
  }

  linkAccount(secondaryIdToken) {
    const primaryUserId = localStorage.getItem('user_id');
    const primaryAccessToken = localStorage.getItem('access_token');

    return this.httpClient.post(
      `https://${environment.auth0.domain}/api/v2/users/${primaryUserId}/identities`,
      {
        link_with: secondaryIdToken
      },
      {
        headers: {
          Authorization: 'Bearer ' + primaryAccessToken
        }
      }
    );
  }

  unlinkAccount(provider: string, secondaryUserId: string) {
    const primaryUserId = localStorage.getItem('user_id');
    const primaryAccessToken = localStorage.getItem('access_token');

    return this.httpClient.delete(
      `https://${environment.auth0.domain}/api/v2/users/${primaryUserId}`
      + `/identities/${provider}/${secondaryUserId}`,
      {
        headers: {
          Authorization: 'Bearer ' + primaryAccessToken
        }
      }
    );
  }

  deleteAccount() {
    const accessToken = localStorage.getItem('access_token');

    return this.httpClient.delete(environment.functions.deleteAccount,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }
    );
  }

  // resendVerificationMail() {
  //   const userId = localStorage.getItem('user_id');
  //   const primaryAccessToken = localStorage.getItem('access_token');

  //   return this.httpClient.post(
  //     environment.functions.verificationMail, {},
  //     {
  //       headers: {
  //         'Authorization': 'Bearer ' + primaryAccessToken
  //       }
  //     }
  //   );
  // }

  primaryProvider() {
    // twitter|959810475054727168
    const userId = localStorage.getItem('user_id');

    // twitter
    return userId.split('|')[0];
  }
}
