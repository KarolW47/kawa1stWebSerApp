import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './interface/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kawa1stWebSerApp';
  userlist$: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.userlist$ = res;
    });
  }


}
