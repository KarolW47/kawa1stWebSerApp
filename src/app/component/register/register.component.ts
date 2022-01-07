import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

class CustomValidators {
  static passwordMatch (control: AbstractControl) : ValidationErrors {
    const password = control.get('password')?.value;
    const repPassword = control.get('repPassword')?.value;

    if (password === repPassword){
      return {};
    } else {
      return {paswordsNotMatching : true};
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  registerForm: FormGroup = new FormGroup({});


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(24),
        Validators.minLength(6),
        Validators.pattern('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'),
      ]),
      emailAddress: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35),
      ]),
      repPassword: new FormControl(null, [
        Validators.required,
      ])    
    },{
      validators: CustomValidators.passwordMatch,
    })
  }

  onSubmit(): void {
    if(this.registerForm.invalid){
      return;
    }
    alert("Registration works!")
  }
  
}
