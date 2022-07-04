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
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.userlist$ = res;
      },
      error: (error) => {
        console.error('Something went wrong, status code:' + error.status + ', error message:' + error.error);
        alert('Something bad happened, try again later.');
      }
    })
  }
}
