import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interface/user';
import { ChangeAboutMeInfoComponent } from '../change-about-me-info.component';

@Component({
  selector: 'app-change-about-me-info-dialog',
  templateUrl: './change-about-me-info-dialog.component.html',
  styleUrls: ['./change-about-me-info-dialog.component.css']
})
export class ChangeAboutMeInfoDialogComponent implements OnInit {

  @Input() currentUserToEditAboutMeInfo!: User;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openChangeAboutMeInfoDialog(user: User) {
    let dialogRef = this.dialog.open(ChangeAboutMeInfoComponent, { data: user, panelClass: 'dialogBox' });
    dialogRef.afterClosed().subscribe();
  }

}
