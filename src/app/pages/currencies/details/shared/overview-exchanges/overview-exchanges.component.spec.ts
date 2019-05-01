import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewExchangesComponent } from './overview-exchanges.component';

describe('OverviewExchangesComponent', () => {
  let component: OverviewExchangesComponent;
  let fixture: ComponentFixture<OverviewExchangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewExchangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
