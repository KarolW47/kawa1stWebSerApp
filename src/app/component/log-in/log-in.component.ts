import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  private responseAccessToken!: any;
  private responseRefreshToken!: any;
  private responseUserId!: any;

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private userservice: UserService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      alert('Something went wrong.');
      return;
    }

    this.userservice
      .logUserIn(
        this.loginForm.get('login')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe({
        next: (resp) => {
          alert('Logged in successfully!');
          this.responseAccessToken = resp.headers.get('access_token');
          this.responseRefreshToken = resp.headers.get('refresh_token');
          this.responseUserId = resp.headers.get('user_id');
          this.tokenStorage.saveTokens(
            this.responseAccessToken,
            this.responseRefreshToken
          );
          this.tokenStorage.saveUserId(this.responseUserId);
          this.router.navigate(['/posts']).then(() => window.location.reload());
        },
        error: (error) => {
          if (error.status === 403) {
            alert('Wrong login or password.');
          } else {
            console.error(
              'Something went wrong, status code:' +
                error.status +
                ', error message:' +
                error.error
            );
            alert('Something bad happened, try again later.');
          }
        },
      });
  }
}
