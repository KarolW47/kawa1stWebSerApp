import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'kawa1stWebSerApp';

  constructor
    (private userService: UserService) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  users = this.userService.getUsers();
}
