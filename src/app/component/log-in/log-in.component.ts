import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private userservice: UserService, private formBuilder: FormBuilder) { }

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
    })
  }

  onSubmit(): void {
    if(this.loginForm.invalid){
      alert("Loging in went wrong.");
      return;
    }
    
    
  }

}
