import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

const APP_TITLE = 'posmn.com';
const SEPARATOR = ' - ';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  init() {
    this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        map((data) => {
          if (data.title) {
            // If a route has a title set (e.g. data: {title: "Foo"}) then we use it
            return SEPARATOR + data.title;
          } else {
            return '';
          }
        })
      ).subscribe((addition) => this.titleService.setTitle(`${APP_TITLE}${addition}`));
  }
}
