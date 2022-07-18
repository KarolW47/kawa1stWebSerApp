import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  @Input() currentUserToChangePassword!: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private user: User
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: [null, [Validators.required]],
        newPassword: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(24),
          ],
        ],
        repNewPassword: [null, [Validators.required]],
      },
      {
        validators: this.passwordsMatchValidation,
      }
    );
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      alert('Something went wrong.');
      return;
    }

    this.userService
      .changePassword(
        this.changePasswordForm.get('oldPassword')?.value,
        this.changePasswordForm.get('newPassword')?.value
      )
      .subscribe({
        next: () => {
          alert('Password changed.');
          this.userService.logUserOut();
          this.router.navigate(['login']).then(() => window.location.reload());
        },
        error: (error) => {
          if (error.status === 401 || error.status === 422) {
            alert(error.error);
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

  private passwordsMatchValidation(control: AbstractControl): ValidationErrors {
    let pass = control.get('newPassword')?.value;
    let repPass = control.get('repNewPassword')?.value;
    if (pass === repPass) {
      return {};
    } else {
      return { passwordsNotMatching: true };
    }
  }
}
