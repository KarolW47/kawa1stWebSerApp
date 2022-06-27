import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password-via-reset-token',
  templateUrl: './change-password-via-reset-token.component.html',
  styleUrls: ['./change-password-via-reset-token.component.css']
})
export class ChangePasswordViaResetTokenComponent implements OnInit {

  resetPasswordToken!: any;
  resetPasswordForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordToken = this.activatedRoute.snapshot.paramMap.get('token');

    this.userService.verifyResetPasswordToken(this.resetPasswordToken).subscribe({
      next: resp => {
        this.resetPasswordToken = resp.body;
        this.displayResetPasswordForm();
      },
      error: error => {
        alert('Something goes wrong.')
        console.log(error.error);
        console.log(error.status);
        this.router.navigate(['/login']);
      }
    })
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      alert("Something went wrong.");
      return;
    }

    this.userService.changePasswordViaResetToken(
      this.resetPasswordToken,
      this.resetPasswordForm.get('password')?.value).subscribe({
        next: resp => {
          alert('Password changed.');
          this.router.navigate(['/login']);
        },
        error: errror => {
          console.log(errror.error);
          console.log(errror.status);
          alert('Something went wrong.')
        }
      })
  }

  private displayResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: [null,
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24),
      ],
      repPassword: [null,
        Validators.required,
      ]
    }, {
      validators: this.passwordsMatchValidation,
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
