import { Injectable } from '@angular/core';
import { Auth0UserProfile, Management } from 'auth0-js';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentProfileService {

  profile: Auth0UserProfile;

  constructor(private auth: AuthService) {
  }

  // returns if new profile is retrieved or not
  getProfile(forceRenew = false): Observable<Auth0UserProfile> {
    if (this.profile && !forceRenew) {
      return of(this.profile);
    }
    const accessToken = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');

    if (!accessToken || !userId) {
      this.profile = undefined;
    }

    const auth0Management = new Management({
      domain: environment.auth0.domain,
      token: accessToken
    });

    return new Observable<Auth0UserProfile>(subscriber => {
      auth0Management.getUser(userId, (err, profile) => {

        if (err) {
          if (err.statusCode === 401) {
            this.auth.logout();
          } else {
            subscriber.error(err);
          }
        }

        this.profile = profile;

        subscriber.next(profile);
        subscriber.complete();
      });
    });
  }

  updateProfile(userMetadata: any): Observable<Auth0UserProfile> {

    const accessToken = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');

    const auth0Management = new Management({
      domain: environment.auth0.domain,
      token: accessToken
    });

    return new Observable<Auth0UserProfile>(subscriber => {
      auth0Management.patchUserMetadata(userId, userMetadata, (err, profile) => {

        if (err) {
          subscriber.error(err);
        }

        this.profile = profile;

        subscriber.next(profile);
        subscriber.complete();
      });
    });
  }
}
