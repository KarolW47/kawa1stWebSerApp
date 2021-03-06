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
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-about-me-info',
  templateUrl: './change-about-me-info.component.html',
  styleUrls: ['./change-about-me-info.component.css'],
})
export class ChangeAboutMeInfoComponent implements OnInit {
  changeAboutMeInfoForm!: FormGroup;

  @Input() currentUserToEdit!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private user: User
  ) {}

  ngOnInit(): void {
    this.changeAboutMeInfoForm = this.formBuilder.group(
      {
        aboutMeInfo: [this.user.aboutMeInfo, [Validators.maxLength(256)]],
      },
      {
        validators: this.sameTextValidation(this.user.aboutMeInfo),
      }
    );
  }

  onSubmit() {
    if (this.changeAboutMeInfoForm.invalid) {
      alert('Something went wrong.');
      return;
    }

    this.userService
      .changeAboutMeInfo(this.changeAboutMeInfoForm.get('aboutMeInfo')?.value)
      .subscribe({
        next: () => {
          alert('About me info changed.');
          window.location.reload();
        },
        error: (error) => {
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

  protected sameTextValidation(currentAboutMeInfo: String): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      let newAboutMeInfo = control.get('postTextMessage')?.value;
      if (newAboutMeInfo === currentAboutMeInfo) {
        return { sameTextValidation: true };
      } else {
        return {};
      }
    };
  }
}
