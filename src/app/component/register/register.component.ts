import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }


  checkoutForm = this.formBuilder.group({
    username: "",
    emailAddress: "",
    password: "",
  });

  onSubmit(): void {
    console.warn('Your account has been registered!', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

}
