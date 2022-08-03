import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { RegisterComponent } from './component/register/register.component';
import { UsersListComponent } from './component/users-list/users-list.component';
import { PostsComponent } from './component/posts/posts.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import { RefreshTokenInterceptor } from './interceptor/refresh-token.interceptor';
import { TokenStorageService } from './service/token-storage.service';
import { EditPostComponent } from './component/edit-post/edit-post.component';
import { DeletePostComponent } from './component/delete-post/delete-post.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { EditPostDialogComponent } from './component/edit-post/edit-post-dialog/edit-post-dialog.component';
import { DeleteUserComponent } from './component/delete-user/delete-user.component';
import { ChangeUsernameComponent } from './component/change-username/change-username.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ChangeAboutMeInfoComponent } from './component/change-about-me-info/change-about-me-info.component';
import { DeleteUserDialogComponent } from './component/delete-user/delete-user-dialog/delete-user-dialog.component';
import { ChangeAboutMeInfoDialogComponent } from './component/change-about-me-info/change-about-me-info-dialog/change-about-me-info-dialog.component';
import { ChangePasswordDialogComponent } from './component/change-password/change-password-dialog/change-password-dialog.component';
import { ChangeUsernameDialogComponent } from './component/change-username/change-username-dialog/change-username-dialog.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ChangePasswordViaResetTokenComponent } from './component/change-password-via-reset-token/change-password-via-reset-token.component';
import { ChatComponent } from './component/chat/chat.component';
import { UsersToChatListComponent } from './component/users-to-chat-list/users-to-chat-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent,
    UsersListComponent,
    PostsComponent,
    AddPostComponent,
    EditPostComponent,
    DeletePostComponent,
    UserProfileComponent,
    EditPostDialogComponent,
    DeleteUserComponent,
    ChangeUsernameComponent,
    ChangePasswordComponent,
    ChangeAboutMeInfoComponent,
    DeleteUserDialogComponent,
    ChangeAboutMeInfoDialogComponent,
    ChangePasswordDialogComponent,
    ChangeUsernameDialogComponent,
    ResetPasswordComponent,
    ChangePasswordViaResetTokenComponent,
    ChatComponent,
    UsersToChatListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(
      [
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LogInComponent },
        { path: 'users', component: UsersListComponent },
        { path: 'user_profile/:user_id', component: UserProfileComponent },
        { path: 'profile', component: UserProfileComponent },
        { path: 'reset_password', component: ResetPasswordComponent },
        {
          path: 'change_password/:token',
          component: ChangePasswordViaResetTokenComponent,
        },
        {
          path: 'posts',
          component: PostsComponent,
          children: [{ path: 'add_post', component: AddPostComponent }],
        },
      ],
      { onSameUrlNavigation: 'reload' }
    ),
    NoopAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    TokenStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
