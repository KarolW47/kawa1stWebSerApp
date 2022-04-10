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

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent,
    UsersListComponent,
    PostsComponent,
    AddPostComponent,
    EditPostComponent,
    DeletePostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LogInComponent},
      { path: 'users', component: UsersListComponent },
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
