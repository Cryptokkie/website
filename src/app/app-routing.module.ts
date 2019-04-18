import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { CurrenciesComponent } from './pages/currencies/currencies.component';
import { DetailsComponent } from './pages/currencies/details/details.component';
import { DisclaimerComponent } from './pages/disclaimer/disclaimer.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { WorkInProgressComponent } from './pages/work-in-progress/work-in-progress.component';

const routes: Routes = [
  { path: '', redirectTo: '/currencies', pathMatch: 'full' },
  { path: 'work-in-progress', component: WorkInProgressComponent, data: { title: 'Work in progress' } },
  { path: 'currencies', component: CurrenciesComponent, data: { title: 'Currencies' } },
  { path: 'currencies/:name', component: DetailsComponent, data: { title: 'Currency Details' } },
  { path: 'currencies/:name/:tab', component: DetailsComponent, data: { title: 'Currency Details' } },
  { path: 'privacy-policy', component: PrivacyComponent, data: { title: 'Privacy Policy' } },
  { path: 'disclaimer', component: DisclaimerComponent, data: { title: 'Disclaimer' } },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent, data: { title: 'Terms & Conditions' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact Us' } },
  // all else to /
  { path: '**', redirectTo: '' }
];

@NgModule({
  // useHash: true because of Azure Storage static website limitations, throws 404 otherwise
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
