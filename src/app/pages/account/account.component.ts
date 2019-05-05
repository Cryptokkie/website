import { Component, OnInit } from '@angular/core';
import { CurrentProfileService } from 'src/app/core/current-profile.service';
import { AuthService } from 'src/app/core/auth.service';
import { LoaderService } from 'src/app/loader/loader.service';
import { catchError, finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { throwError } from 'rxjs';
import { DeleteAccountDialogComponent } from './delete-account-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    public profileService: CurrentProfileService,
    private auth: AuthService,
    public loader: LoaderService,
    private dialog: MatDialog) { }

  ngOnInit() {

  }

  link(provider: string) {
    this.auth.link(provider);
  }

  unlink(provider: string) {
    this.loader.show('unlink');

    this.profileService.profile.identities.forEach(identity => {
      if (identity.provider === provider) {
        const secondaryUserId = identity.user_id;
        this.auth.unlinkAccount(provider, secondaryUserId)
          .pipe(catchError(err => {
            this.dialog.open(ErrorDialogComponent);

            this.loader.hide('unlink');

            return throwError(err);
          }))
          .subscribe(() => {
            this.retrieveProfile(true);
          });
      }
    });
  }

  retrieveProfile(forceRenew = false) {
    this.loader.show('retrieve-profile');
    this.profileService.getProfile(forceRenew)
      .pipe(
        finalize(() => this.loader.hide('retrieve-profile')),
        catchError(err => {
          this.dialog.open(ErrorDialogComponent);
          return throwError(err);
        })
      )
      .subscribe();
  }

  showWarning() {
    this.dialog.open(DeleteAccountDialogComponent);
  }
}
