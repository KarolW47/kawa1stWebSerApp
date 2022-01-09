import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router,) { }

  registerForm: FormGroup = new FormGroup({});


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, [
        Validators.required,
        Validators.maxLength(24),
        Validators.minLength(6),
        Validators.pattern('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'),
      ]],
      emailAddress: [null, [
        Validators.required,
        Validators.email,
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35),
      ]],
      repPassword: [null, [
        Validators.required,
      ]]    
    },{
      validators: CustomValidators.passwordMatch,
    })
  }

  onSubmit(): void {
    debugger;
    if(this.registerForm.invalid){
      alert("Registration went wrong.");
      return;
    }
    //cant call subscribe on this save method from userservice
    this.userService.save(this.registerForm.value);
    alert("Your account has been created!")
    this.router.navigate(['login']);
  }
  
}
