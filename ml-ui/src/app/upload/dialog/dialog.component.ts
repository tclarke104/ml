import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UploadService } from '../services/upload.service';
import { forkJoin } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  template: `
    <input
      type="file"
      #file
      style="display: none"
      (change)="onFilesAdded()"
      multiple
    />
    <h1 mat-dialog-title>Upload Files</h1>
    <mat-form-field class="full-width-input">
      <input matInput [formControl]="fileNameControl" placeholder="FILE NAME">
    </mat-form-field>
    <button
      [disabled]="uploading || uploadSuccessful"
      mat-raised-button
      color="primary"
      class="add-files-btn"
      (click)="addFiles()">
      Add Files
    </button>
    <button *ngIf="showCancelButton" mat-button mat-dialog-close>Cancel</button>
    <button
      mat-raised-button
      color="primary"
      [disabled]="!canBeClosed"
      (click)="closeDialog()">
      {{primaryButtonText}}
    </button>
    <mat-list>
      <mat-list-item *ngFor="let file of files">
        <h4 mat-line>{{file.name}}</h4>
        <mat-progress-bar
          *ngIf="progress"
          mode="determinate"
          [value]="progress[file.name].progress | async"
        ></mat-progress-bar>
      </mat-list-item>
    </mat-list>
  `,
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('file', {static: false}) file: any;
  fileNameControl = new FormControl('');
  progress: any;
  canBeClosed = false;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  public files: Set<File> = new Set();

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public uploadService: UploadService) {}

  ngOnInit() {
    this.fileNameControl.valueChanges.subscribe(value => {
      this.canBeClosed = value && this.files.size > 0;
    });
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;

    for (const key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }

    this.canBeClosed = this.fileNameControl.value && this.files.size > 0;
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.fileNameControl.value, this.files);

    // convert the progress map into an array
    const allProgressObservables = [];
    for (const key of Object.keys(this.progress)) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }
}
