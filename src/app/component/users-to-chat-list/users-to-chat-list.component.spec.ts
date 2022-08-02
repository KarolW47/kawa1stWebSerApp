import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersToChatListComponent } from './users-to-chat-list.component';

describe('UsersToChatListComponent', () => {
  let component: UsersToChatListComponent;
  let fixture: ComponentFixture<UsersToChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersToChatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersToChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
