import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationCallbackActivateGuard } from './core/authentication-callback-activate.guard';
import { ContactComponent } from './pages/contact/contact.component';
import { CurrenciesComponent } from './pages/currencies/currencies.component';
import { DetailsComponent } from './pages/currencies/details/details.component';
import { DisclaimerComponent } from './pages/disclaimer/disclaimer.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  { path: '', redirectTo: 'currencies', pathMatch: 'full' },
  // { path: 'work-in-progress', component: WorkInProgressComponent, data: { title: 'Work in progress' } },
  // { path: '', component: CurrenciesComponent, canActivate: [AuthenticationCallbackActivateGuard], data: { title: 'Currencies' } },
  { path: 'currencies', component: CurrenciesComponent, data: { title: 'Currencies' }, canActivate: [AuthenticationCallbackActivateGuard] },
  { path: 'currencies/:name', component: DetailsComponent, data: { title: 'Currency Details' } },
  { path: 'currencies/:name/:tab', component: DetailsComponent, data: { title: 'Currency Details' } },
  { path: 'privacy-policy', component: PrivacyComponent, data: { title: 'Privacy Policy' } },
  { path: 'disclaimer', component: DisclaimerComponent, data: { title: 'Disclaimer' } },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent, data: { title: 'Terms & Conditions' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact Us' } },
  { path: 'account', component: AccountComponent, data: { title: 'Account Details' } },
  // all else to /
  { path: '**', redirectTo: 'currencies' }
];

@NgModule({
  // useHash: true because of Azure Storage static website limitations, throws 404 otherwise
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  providers: [AuthenticationCallbackActivateGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
