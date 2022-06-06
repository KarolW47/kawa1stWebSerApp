import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interface/user';
import { ChangePasswordComponent } from '../change-password.component';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {

  @Input() currentUserToChangePassword!: User;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openChangePasswordDialog(user: User){
    let dialogRef = this.dialog.open(ChangePasswordComponent, {data: user});
    dialogRef.afterClosed().subscribe();
  }

}
