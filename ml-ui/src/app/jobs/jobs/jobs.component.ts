import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Observable } from 'rxjs';
import { JobViewModel } from '../../../../../common';

@Component({
  selector: 'app-jobs',
  template: `
  <div *ngIf="jobs$ | async as jobs">
    <table mat-table [dataSource]="jobs" class="mat-elevation-z8 jobs-table">

      <ng-container matColumnDef="jobId">
        <th mat-header-cell *matHeaderCellDef> Job Id </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>
      <ng-container matColumnDef="file">
        <th mat-header-cell *matHeaderCellDef> File Name </th>
        <td mat-cell *matCellDef="let element"> {{element.fileName}} </td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef> Status </th>
        <td mat-cell *matCellDef="let element"> {{element.status}} </td>
      </ng-container>

      <ng-container matColumnDef="diagnosis">
        <th mat-header-cell *matHeaderCellDef> Diagnosis </th>
        <td mat-cell *matCellDef="let element"> {{element.diagnosis}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>
  `,
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  displayedColumns = ['jobId', 'file', 'status', 'diagnosis'];
  jobs$: Observable<JobViewModel[]> = this.jobsService.getJobs();

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
  }

}
