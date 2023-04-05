import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      emailAddress: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      alert('Registration went wrong.');
      return;
    }

    this.userService.resetPassword(this.resetForm.value).subscribe({
      next: () => {
        alert(
          'Instructions with password reset has been sent on provided email address.'
        );
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (error.status === 404) {
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

  onCancel() {
    this.router.navigate(['/login']);
  }
}
