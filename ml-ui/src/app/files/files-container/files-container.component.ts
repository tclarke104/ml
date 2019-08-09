import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { MatDialog } from '@angular/material';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';

@Component({
  selector: 'app-files-container',
  template: `
  <div *ngIf="files$ | async as files">
    <table mat-table [dataSource]="files" class="mat-elevation-z8 file-table">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> Upload Id </th>
        <td mat-cell *matCellDef="let element"> {{element.uploadId}} </td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> File Name </th>
        <td mat-cell *matCellDef="let element"> {{element.fileName}} </td>
      </ng-container>
      <ng-container matColumnDef="time">
        <th mat-header-cell *matHeaderCellDef> Upload Date </th>
        <td mat-cell *matCellDef="let element"> {{element.uploadTime | date}} </td>
      </ng-container>

      <ng-container matColumnDef="schedule">
        <th mat-header-cell *matHeaderCellDef> Schedule Job </th>
        <td mat-cell *matCellDef="let element">
          <button mat-raised-button (click)="openJobDialog(element)" color="primary">SCHEDULE JOB</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>
  <app-upload class="upload-button"></app-upload>
  `,
  styleUrls: ['./files-container.component.scss']
})
export class FilesContainerComponent implements OnInit {
  files$ = this.fileService.getFiles();
  displayedColumns = ['id', 'name', 'time', 'schedule'];

  constructor(private fileService: FilesService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openJobDialog(file) {
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: '80rem',
      data: file
    });
  }

}
