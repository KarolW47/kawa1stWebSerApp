import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAboutMeInfoComponent } from './change-about-me-info.component';

describe('ChangeAboutMeInfoComponent', () => {
  let component: ChangeAboutMeInfoComponent;
  let fixture: ComponentFixture<ChangeAboutMeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAboutMeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAboutMeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
