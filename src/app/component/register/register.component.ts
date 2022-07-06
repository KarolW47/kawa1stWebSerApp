import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

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
      validators: this.passwordsMatchValidation,
    })
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      alert("Registration went wrong.");
      return;
    }

    this.userService.saveUser(this.registerForm.value).subscribe({
      next: () => {
        alert('Registered!');
        this.router.navigate(['login']);
      },
      error: (error) => {
        if (error.status === 422) {
          alert(error.error);
        } else {
          console.error('Something went wrong, status code:' + error.status + ', error message:' + error.error);
          alert('Something bad happened, try again later.');
        }
      }
    });
  }

  private passwordsMatchValidation(control: AbstractControl): ValidationErrors {
    let pass = control.get('password')?.value;
    let repPass = control.get('repPassword')?.value;
    if (pass === repPass) {
      return {};
    } else {
      return { passwordsNotMatching: true };
    }
  }
}
