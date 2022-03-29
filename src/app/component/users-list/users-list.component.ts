import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userlist$: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.userlist$ = res;
    });
  }
}
