import { HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { subscribeOn, Subscriber } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

class CustomValidators {
  static passwordMatch(control: AbstractControl): ValidationErrors {
    const password = control.get('password')?.value;
    const repPassword = control.get('repPassword')?.value;

    if (password === repPassword) {
      return {};
    } else {
      return { paswordsNotMatching: true };
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

  registerForm!: FormGroup;


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
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35),
      ]],
      repPassword: [null, [
        Validators.required,
      ]]
    }, {
      validators: CustomValidators.passwordMatch,
    })
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      alert("Registration went wrong.");
      return;
    }

    let registeredValue = this.userService.saveUser(this.registerForm.value).subscribe();
    console.log(registeredValue);

    //gotta change null to some kind hasError method
    if (registeredValue == null) {
      alert(registeredValue);
    } else {
      alert("Your account has been created!")
      this.router.navigate(['login']);
    }


  }

}
