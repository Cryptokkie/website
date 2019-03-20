import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrettyCoinNamePipe } from './pretty-coin-name.pipe';

@NgModule({
  declarations: [PrettyCoinNamePipe],
  imports: [
    CommonModule
  ],
  exports: [
    PrettyCoinNamePipe
  ]
})
export class CoinInfoModule { }
