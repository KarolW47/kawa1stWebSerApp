import { Component, Inject, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/service/post.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  editPostForm!: FormGroup;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private post: Post
  ) {}

  ngOnInit(): void {
    this.editPostForm = this.formBuilder.group(
      {
        id: [this.post.id],
        postTextMessage: [
          this.post.postTextMessage,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(512),
          ],
        ],
      },
      {
        validators: this.sameTextValidation(this.post.postTextMessage),
      }
    );
  }

  onSubmit() {
    if (this.editPostForm.invalid) {
      alert('Something went wrong.');
      return;
    }

    this.postService.editPost(this.editPostForm.value).subscribe({
      next: (resp) => {
        console.log(resp.status);
        alert('Changes saved successfully.');
        window.location.reload();
      },
      error: (error) => {
        console.log(error.status);
        console.log(error.error);
        alert('Something went wrong.');
      },
      complete() {
        console.log('Subscribe for editing post - done.');
      },
    });
  }

  protected sameTextValidation(currentPostTextMessage: String): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      let newPostTextMessage = control.get('postTextMessage')?.value;
      if (newPostTextMessage === currentPostTextMessage) {
        return { sameTextValidation: true };
      } else {
        return {};
      }
    };
  }
}
