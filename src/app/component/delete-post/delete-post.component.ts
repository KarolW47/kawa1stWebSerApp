import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  constructor(private postService: PostService) { }

  @Input() currentPostToDelete!: Post;

  ngOnInit(): void {
  }

  onDelete(post: Post): void {
    if (confirm('Are you sure, you want to delete this post?')) {
      this.postService.deletePost(post).subscribe({
        next: (resp) => {
          alert('Post deleted.');
          console.log(resp);
          window.location.reload()
        },
        error: (error) => {
          alert('Something goes wrong.')
          console.log(error.error)
        }
      });
    } else return;
  }
}
