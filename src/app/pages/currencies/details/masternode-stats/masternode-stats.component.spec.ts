import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasternodeStatsComponent } from './masternode-stats.component';

describe('MasternodeStatsComponent', () => {
  let component: MasternodeStatsComponent;
  let fixture: ComponentFixture<MasternodeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasternodeStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasternodeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
