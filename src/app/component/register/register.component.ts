import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/interface/user';
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

  public responseCode!: number;
  public responseError!: string;


  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

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

    //
    this.userService.saveUser(this.registerForm.value).subscribe({
      next: (resp: HttpResponse<User>): void => {
        this.responseCode = resp.status;
        console.log(resp);
      },
      error: (error: HttpErrorResponse): void => {
        this.responseCode = error.status;
        this.responseError = error.error;
        console.log(error);
      },
      complete() { console.log('Subscribe to save user done.'); }
    });
    
    console.log(this.responseCode);
    console.log(this.responseError);
    
    switch (this.responseCode) {
      case 200:
        alert('Registered!');
        this.router.navigate(['login']);
        break;
      case 422:
        alert(this.responseError);
        break;
      default:
        alert("Something went wrong, try again.");
    }
  }
}
