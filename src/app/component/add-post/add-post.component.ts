import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  responseCode!: number;
  responseError!: string;
  postForm!: FormGroup;


  constructor(private postService: PostService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postTextMessage: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(512),
      ]],
    })
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      alert("Something went wrong.");
      return;
    }

    this.postService.addPost(this.postForm.value).subscribe({
      next: (resp) => {
        this.responseCode = resp.status;
        alert("Post added successfully.");
        console.log(this.responseCode);
        this.router.navigate(['posts']).then(
          () => window.location.reload()
        );
      },
      error: (error) => {
        this.responseCode = error.status;
        this.responseError = error.error;
        console.log(this.responseCode);
        console.log(this.responseError);
        alert(this.responseError);
      }
    })
  }

}
