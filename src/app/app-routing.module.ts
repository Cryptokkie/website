import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesComponent } from './pages/currencies/currencies/currencies.component';

const routes: Routes = [
  { path: '', redirectTo: '/currencies', pathMatch: 'full' },
  { path: 'currencies', component: CurrenciesComponent },
  // all else to /
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
