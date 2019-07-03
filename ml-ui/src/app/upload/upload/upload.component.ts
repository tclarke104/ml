import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadService } from '../services/upload.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-upload',
  template: `
  <button mat-raised-button (click)="openUploadDialog()">Upload</button>
  `,
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  constructor(public dialog: MatDialog, public uploadService: UploadService) {}

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      height: '50%',
    })
  }

  ngOnInit() {

  }

}
