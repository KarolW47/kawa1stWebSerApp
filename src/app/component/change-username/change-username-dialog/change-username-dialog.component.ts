import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interface/user';
import { ChangeUsernameComponent } from '../change-username.component';

@Component({
  selector: 'app-change-username-dialog',
  templateUrl: './change-username-dialog.component.html',
  styleUrls: ['./change-username-dialog.component.css']
})
export class ChangeUsernameDialogComponent implements OnInit {

  @Input() currentUserToEditUsername!: User;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openChangeUsernameDialog(user: User){
    let dialogRef = this.dialog.open(ChangeUsernameComponent, {data: user});
    dialogRef.afterClosed().subscribe();
  }

}
