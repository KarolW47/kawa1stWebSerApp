import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = {id: 0, username: '', emailAddress: '', password: '', aboutMeInfo: '', userPosts: []};
  username!: string;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.username = params['username'];
      });

    this.userService.getUser(this.username).subscribe(resp => this.user = resp);
  }

}
