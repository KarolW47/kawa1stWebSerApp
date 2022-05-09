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
    DeleteUserDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LogInComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'user_profile/:username', component: UserProfileComponent, },
      {
        path: 'posts', component: PostsComponent, children: [
          { path: 'add_post', component: AddPostComponent },]
      },
    ]),
    NoopAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    TokenStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
