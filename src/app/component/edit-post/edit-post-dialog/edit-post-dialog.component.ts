import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/interface/post';
import { EditPostComponent } from '../edit-post.component';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.css'],
})
export class EditPostDialogComponent implements OnInit {
  @Input() currentPostToEdit!: Post;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openEditDialog(post: Post) {
    let dialogRef = this.dialog.open(EditPostComponent, {
      data: post,
      panelClass: 'dialogBox',
      width: '55%'
    });
    dialogRef.afterClosed().subscribe();
  }
}
