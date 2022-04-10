import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/interface/post';
import { PostService } from 'src/app/service/post.service';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsList$: Post[] = [];
  wasClicked: boolean = false;

  constructor(private postService: PostService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.postsList$ = res.reverse();
    })
  }

  onAddPost(): void {
    this.wasClicked = true;
  }

  openEditDialog(post: Post) {
    let dialogRef = this.dialog.open(EditPostComponent, { data: post });
    dialogRef.afterClosed().subscribe(result => alert(result))
  }
}
