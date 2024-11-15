import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessModalComponent } from './success.component';

describe('SuccessComponent', () => {
  let component: SuccessModalComponent;
  let fixture: ComponentFixture<SuccessModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessModalComponent]
    });
    fixture = TestBed.createComponent(SuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
