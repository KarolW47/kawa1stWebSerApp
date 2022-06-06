import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup;

  @Input() currentUserToChangePassword!: User;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private user: User) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [
        Validators.required,
      ]],
      newPassword: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24),
      ]],
      repNewPassword: [null, [
        Validators.required,
      ]]
    }, {
      validators: RegisterComponent.passwordMatchValidation,
    })
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      alert("Something went wrong.")
      return;
    }

    this.userService.changePassword(
      this.changePasswordForm.get('oldPassword')?.value,
      this.changePasswordForm.get('newPassword')?.value
      ).subscribe({
        next: (resp) => {
          alert('Password changed.');
          this.router.navigate(['login']);
        },
        error: (error) => {
        console.log(error.status);
        console.log(error.error);
        alert(error.error);
        }
      });
  }

}
