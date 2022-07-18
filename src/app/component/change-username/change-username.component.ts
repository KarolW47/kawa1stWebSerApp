import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css'],
})
export class ChangeUsernameComponent implements OnInit {
  changeUsernameForm!: FormGroup;

  @Input() currentUserToEdit!: User;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private user: User
  ) {}

  ngOnInit(): void {
    this.changeUsernameForm = this.formBuilder.group(
      {
        username: [
          this.user.username,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(24),
            Validators.pattern(
              '^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
            ),
          ],
        ],
      },
      {
        validators: this.sameUsernameValidation(this.user.username),
      }
    );
  }

  onSubmit() {
    if (this.changeUsernameForm.invalid) {
      alert('Something went wrong.');
      return;
    }
    this.userService
      .changeUsername(this.changeUsernameForm.get('username')?.value)
      .subscribe({
        next: () => {
          alert('Username changed successfully.');
          this.router
            .navigate(['/user_profile', this.user.id])
            .then(() => window.location.reload());
        },
        error: (error) => {
          if (error.status === 422) {
            alert(error.error);
          }
          console.error(
            'Something went wrong, status code:' +
              error.status +
              ', error message:' +
              error.error
          );
          alert('Something bad happened, try again later.');
        },
      });
  }

  protected sameUsernameValidation(currentUsername: String): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      let newUsername = control.get('username')?.value;
      if (newUsername === currentUsername) {
        return { sameUsernameValidation: true };
      } else {
        return {};
      }
    };
  }
}
