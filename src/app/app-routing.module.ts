import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesComponent } from './pages/currencies/currencies.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { WorkInProgressComponent } from './pages/work-in-progress/work-in-progress.component';

const routes: Routes = [
  { path: '', redirectTo: '/work-in-progress', pathMatch: 'full' },
  { path: 'work-in-progress', component: WorkInProgressComponent, data: { title: 'Work in progress' } },
  { path: 'currencies', component: CurrenciesComponent, data: { title: 'Currencies' } },
  { path: 'privacy-policy', component: PrivacyComponent, data: { title: 'Privacy Policy' } },
  // all else to /
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
