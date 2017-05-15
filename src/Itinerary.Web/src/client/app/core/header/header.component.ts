﻿import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { AuthService } from '../auth/auth.service';
import { SigninDialogComponent } from '../signin/signin-dialog.component';

@Component({
  moduleId: module.id,
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  constructor(
    private dialog: MdDialog,
    private authService: AuthService) {
  }

  public signin() {
    const dialogRef = this.dialog.open(SigninDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      // TODO: Add implementation
    });
  }

  public signout() {
    return;
  }

  public get signedin(): boolean {
    return this.authService.loggedIn();
  }
}