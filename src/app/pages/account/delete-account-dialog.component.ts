import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'app-delete-account-dialog',
    templateUrl: './delete-account-dialog.component.html'
})
export class DeleteAccountDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
        private auth: AuthService
    ) { }

    ngOnInit() {
    }

    deleteAccount() {
        this.auth.deleteAccount().subscribe();
        this.auth.logout();
        this.dialogRef.close();
    }
}
