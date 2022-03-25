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

  constructor(private postService: PostService, private formBuilder: FormBuilder, private router: Router) { }

  responseCode!: number;
  responseError!: string;
  postForm!: FormGroup;
  
  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      text:[null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(512),
      ]],
    })
  }

  onSubmit(): void {
    if(this.postForm.invalid){
      alert("Something went wrong.");
      return;
    }
    
    this.postService.addPost(this.postForm.value).subscribe({
      next: (resp) => {
        this.responseCode = resp.status;
        alert("Post added successfully.");
        console.log(this.responseCode);
        // this.router.navigate(['posts'])
      },
      error: (error) => {
        this.responseCode = error.status;
        this.responseError = error.error;
        console.log(this.responseCode);
        console.log(this.responseError);
        alert(this.responseError);
      },
      complete() {
        console.log("Subscribe for adding post - done.");
      }
    })
  }

}
