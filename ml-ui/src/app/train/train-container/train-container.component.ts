import { Component, OnInit } from '@angular/core';
import { TrainService } from '../train.service';
import { MatDialog } from '@angular/material';
import { TrainDialogComponent } from '../train-dialog/train-dialog.component';
import { TrainInfoDialogComponent } from '../train-info-dialog/train-info-dialog.component';
import { TrainJobViewModel } from '../../../../../common';
import { merge } from 'rxjs';

@Component({
  selector: 'app-train-container',
  template: `
  <div *ngIf="trainJobs$ | async as jobs" class="train-table-container">
    <table mat-table [dataSource]="jobs" class="mat-elevation-z8" class="train-table">

      <ng-container matColumnDef="jobId">
        <th mat-header-cell *matHeaderCellDef> Job Id </th>
        <td mat-cell *matCellDef="let element"> {{element._id}} </td>
      </ng-container>
      <ng-container matColumnDef="network">
        <th mat-header-cell *matHeaderCellDef> File Name </th>
        <td mat-cell *matCellDef="let element"> {{element.networkName}} </td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef> Status </th>
        <td mat-cell *matCellDef="let element"> {{element.status}} </td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <button mat-button (click)="openInfoDialog(element)">VIEW TRAINING INFO</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>
  <button mat-raised-button (click)="openScheduleDialog()" class="schedule-button">{{'Schedule new train job' | uppercase}}</button>

  `,
  styleUrls: ['./train-container.component.scss']
})
export class TrainContainerComponent implements OnInit {
  displayedColumns = ['jobId', 'network', 'status', 'action'];
  trainJobs$ = merge(this.trainService.getTrainJobs(), this.trainService.streamTrainJobs());

  constructor(private trainService: TrainService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openScheduleDialog( ) {
    this.dialog.open(TrainDialogComponent, {
      width: '80rem',
    });
  }

  openInfoDialog(job: TrainJobViewModel) {
    this.dialog.open(TrainInfoDialogComponent, {
      width: '80rem',
      data: job
    });
  }

}
