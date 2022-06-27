import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordViaResetTokenComponent } from './change-password-via-reset-token.component';

describe('ChangePasswordViaResetTokenComponent', () => {
  let component: ChangePasswordViaResetTokenComponent;
  let fixture: ComponentFixture<ChangePasswordViaResetTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordViaResetTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordViaResetTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
