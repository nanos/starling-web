import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DspBalanceComponent } from './dsp-balance.component';

describe('DspBalanceComponent', () => {
  let component: DspBalanceComponent;
  let fixture: ComponentFixture<DspBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DspBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
