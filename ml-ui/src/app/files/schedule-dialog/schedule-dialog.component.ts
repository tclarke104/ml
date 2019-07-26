import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FilesService } from '../files.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-dialog',
  template: `
    <h2>{{data.fileName}}</h2>
    <div *ngIf="networks$ | async as networks">
      <mat-form-field class="full-width">
        <mat-label>NETWORKS</mat-label>
        <mat-select [formControl]="networkFormControl">
          <mat-option *ngFor="let network of networks" [value]="network">
            {{network.modelName}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <div *ngIf="selectedNetwork">
        <h4>{{selectedNetwork.modelName}}</h4>
        <h5>Test Accuracy: {{selectedNetwork.testAcc}}</h5>
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              Potiential Diagnoses
            </mat-panel-title>
          </mat-expansion-panel-header>
          <mat-grid-list cols="5" rowHeight="4:1">
            <mat-grid-tile *ngFor="let diagnosis of selectedNetwork.classes" class="diagnosis">{{diagnosis}}</mat-grid-tile>
          </mat-grid-list>
        </mat-expansion-panel>
        <button mat-raised-button (click)="scheduleJob()" color="primary" class="full-width schedule-button">SCHEDULE JOB</button>
      </div>
    </div>
  `,
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent implements OnInit {
  networkFormControl = new FormControl('');
  networks$ = this.filesService.getNetworks();
  selectedNetwork;

  constructor(public dialogRef: MatDialogRef<ScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private filesService: FilesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.networkFormControl.valueChanges.subscribe(value => this.selectedNetwork = value);
  }

  scheduleJob() {
    this.filesService.scheduleNetowrk(this.selectedNetwork.id, this.data.uploadId).subscribe(res => {
      this.snackBar.open(`successfully scheduled job ${res.jobId}`, '', { duration: 1000 });
      this.dialogRef.close();
    }, err => this.snackBar.open(`something went wrong`, '', { duration: 1000 }));
  }

}
