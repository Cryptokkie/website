import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<boolean>();

  loaderState = this.loaderSubject.asObservable();
  loading = false;

  constructor() { }

  show() {
    this.loading = true;
    this.loaderSubject.next(true);
  }

  hide() {
    this.loading = false;
    this.loaderSubject.next(false);
  }
}
