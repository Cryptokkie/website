import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesOverviewComponent } from './currencies-overview.component';

describe('CurrenciesOverviewComponent', () => {
  let component: CurrenciesOverviewComponent;
  let fixture: ComponentFixture<CurrenciesOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenciesOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
