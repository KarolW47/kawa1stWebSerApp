import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  confirmWithPassowrdForm!: FormGroup;

  @Input() currentUserToDelete!: User;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private user: User
  ) { }

  ngOnInit(): void {
    this.confirmWithPassowrdForm = this.formBuilder.group({
      password: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35)
      ]]
    })
  }

  onSubmit() {
    if (this.confirmWithPassowrdForm.invalid) {
      alert("Something went wrong.");
      return;
    }

    this.userService.deleteUser(this.confirmWithPassowrdForm.get('password')?.value).subscribe({
      next: () => {
        alert("User deleted.");
        this.userService.logUserOut();
        this.router.navigate(['/login']).then(
          () => window.location.reload()
        );
      },
      error: error => {
        console.log(error.error);
        console.log(error.status);
        alert("Something went wrong.");
      }
    });
  }

}
