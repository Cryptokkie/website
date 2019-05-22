import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinReviewsComponent } from './coin-reviews.component';

describe('CoinReviewsComponent', () => {
  let component: CoinReviewsComponent;
  let fixture: ComponentFixture<CoinReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
