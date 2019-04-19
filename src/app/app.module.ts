import { NgModule } from '@angular/core';
import { BREAKPOINTS, DEFAULT_BREAKPOINTS, FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TitleService } from './core/title.service';
import { MaterialModule } from './material/material.module';
import { PagesModule } from './pages/pages.module';
import { SideMenuComponent } from './side-menu/side-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    PagesModule,
    CoreModule
  ],
  providers: [
    {
      provide: BREAKPOINTS,
      useValue: DEFAULT_BREAKPOINTS.map(x => {
        switch (x.alias) {
          case 'lg':
            x.mediaQuery = 'screen and (min-width: 1280px) and (max-width: 1599.99px)';
            break;
          case 'xl':
            x.mediaQuery = 'screen and (min-width: 1600px) and (max-width: 4999.99px)';
            break;
          case 'lt-lg':
            x.mediaQuery = 'screen and (max-width: 1599.99px)';
            break;
          case 'gt-lg':
            x.mediaQuery = 'screen and (min-width: 1600px)';
            break;
          default:
            break;
        }
        return x;
      })
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(titleService: TitleService) {
    titleService.init();
  }
 }
