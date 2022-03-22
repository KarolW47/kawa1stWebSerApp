import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent,
    UsersListComponent,
    PostsComponent,
    AddPostComponent
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
      { path: 'posts', component: PostsComponent, children: [
        { path: 'add_post', component: AddPostComponent },
      ]},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
