import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading = {};

  constructor() { }

  show(context: string) {
    this.loading[context] = true;
  }

  hide(context: string) {
    this.loading[context] = false;
  }

  isLoading(context: string) {
    return this.loading[context];
  }
}
