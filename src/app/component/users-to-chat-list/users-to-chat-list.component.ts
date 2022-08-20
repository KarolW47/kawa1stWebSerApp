import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-to-chat-list',
  templateUrl: './users-to-chat-list.component.html',
  styleUrls: ['./users-to-chat-list.component.css'],
})
export class UsersToChatListComponent implements OnInit {
  currentUserId! : number;
  userlist: User[] = [];
  isDisplayingChat: boolean = false;
  chosenUser!: User;

  constructor(private userService: UserService, public tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUserId = this.tokenStorageService.getUserId();

    this.userService.getUsers().subscribe({
      next: (res) => {
        this.userlist = res;
      },
      error: (error) => {
        console.error(
          'Something went wrong, status code:' +
            error.status +
            ', error message:' +
            error.error
        );
        alert('Something bad happened, try again later.');
      },
    });
  }
  
  onClickToChat(user: User){
    this.chosenUser = user;
    this.isDisplayingChat = true;
  }
}
