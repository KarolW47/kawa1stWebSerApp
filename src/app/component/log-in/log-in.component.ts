import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public responseCode!: number;
  public responseError!: string;

  loginForm: FormGroup = new FormGroup({});

  constructor(private userservice: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [
        Validators.required,
        Validators.maxLength(24),
        Validators.minLength(6),
        Validators.pattern('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'),
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35)
      ]],
      emailAddress: [null]
    })
  }

  onSubmit(): void {
    if(this.loginForm.invalid){
      alert("Loging in went wrong.");
      return;
    }
    
    this.userservice.logUserIn(this.loginForm.value).subscribe({
      next: (resp) => {
        this.responseCode = resp.status;
        alert('Logged in successfully!');
        this.router.navigate(['/']);
        console.log(this.responseCode);
        console.log(resp.body, resp.headers)
      },
      error: (error) => {
        this.responseCode = error.status;
        this.responseError = error.error;
        console.log(this.responseError);
        console.log(this.responseCode);
        alert(this.responseError);
      },
      complete() {
        console.log('Subscribe for loging user in done.');
      }
    });
    
  }

}
