import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountMasternodesChartComponent } from './amount-masternodes-chart.component';

describe('AmountMasternodesChartComponent', () => {
  let component: AmountMasternodesChartComponent;
  let fixture: ComponentFixture<AmountMasternodesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountMasternodesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountMasternodesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
