import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account.component';
import { DeleteAccountDialogComponent } from './delete-account-dialog.component';

@NgModule({
  declarations: [AccountComponent, DeleteAccountDialogComponent],
  entryComponents: [DeleteAccountDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AccountModule { }
