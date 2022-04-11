import { Component, Inject, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/service/post.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  editPostForm!: FormGroup;
  respForDialog: String = "Editing canceled.";

  constructor(private postService: PostService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: Post) { }

  ngOnInit(): void {
    this.editPostForm = this.formBuilder.group({
      id: [this.data.id],
      postTextMessage: [this.data.postTextMessage, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(512),
      ]]
    }, {
      validators: EditPostComponent.sameTextValidation(this.data.postTextMessage),
    })
  }

  onSubmit() {
    if (this.editPostForm.invalid) {
      alert("Something went wrong.");
      return;
    }

    this.postService.editPost(this.editPostForm.value).subscribe({
      next: (resp) => {
        console.log(resp.status);
        alert("Changes saved successfully.");
      },
      error: (error) => {
        console.log(error.status);
        console.log(error.error);
        alert("Something went wrong.")
      },
      complete() {
        console.log("Subscribe for editing post - done.");
      }
    })

  }

  static sameTextValidation(postTextMessage: String): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      let editPostTextMessage = control.get("postTextMessage")?.value;
      if (editPostTextMessage === postTextMessage) {
        return { sameTextValidation: true };
      } else {
        return {};
      }
    }
  }
}
