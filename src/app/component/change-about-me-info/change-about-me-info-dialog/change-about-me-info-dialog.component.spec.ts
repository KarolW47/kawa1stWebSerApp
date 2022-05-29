import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAboutMeInfoDialogComponent } from './change-about-me-info-dialog.component';

describe('ChangeAboutMeInfoDialogComponent', () => {
  let component: ChangeAboutMeInfoDialogComponent;
  let fixture: ComponentFixture<ChangeAboutMeInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAboutMeInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAboutMeInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
