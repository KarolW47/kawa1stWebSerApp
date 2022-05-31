import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interface/user';
import { DeleteUserComponent } from '../delete-user.component';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  @Input() currentUserToDeleteProfile!: User;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDeleteUserDialog(user: User) {
    if (confirm('Are You sure, You want to delete this profile?')) {
      let dialogRef = this.dialog.open(DeleteUserComponent, { data: user });
      dialogRef.afterClosed().subscribe();
    } else return;
  }

}
