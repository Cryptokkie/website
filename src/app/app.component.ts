import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './core/auth.service';
import { CurrentProfileService } from './core/current-profile.service';
import { ErrorDialogComponent } from './pages/shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  onAuthSub: any;
  getProfileSub: any;

  constructor(
    public auth: AuthService,
    private profileService: CurrentProfileService,
    public mediaObserver: MediaObserver,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.onAuthSub = this.auth.onAuthenticated.subscribe(() => {
      this.retrieveProfile(true); // true because after social account linking the profile is retrieved, but needs to be updated.
    });

    if (this.auth.isAuthenticated()) {
      this.retrieveProfile();
    }
  }

  retrieveProfile(forceRenew = false) {

    this.getProfileSub = this.profileService.getProfile(forceRenew)
      .pipe(
        // finalize(() => this.loader.hide()),
        catchError(err => {
          this.dialog.open(ErrorDialogComponent);
          return throwError(err);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onAuthSub.unsubscribe();
    this.getProfileSub.unsubscribe();
  }
}
