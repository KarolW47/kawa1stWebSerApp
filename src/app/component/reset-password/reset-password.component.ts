import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  emailAddress!: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSend(emailAddress: string){
    this.userService.resetPassword(emailAddress).subscribe({
      next: () => {
        alert("Instructions with password reset has been sent to provided email address.");
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error.error);
        console.log(error.status);
      }
    });
  }

  onCancel(){
    this.router.navigate(['/login']);
  }

}
