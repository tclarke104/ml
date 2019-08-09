import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TrainService } from '../train.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-train-dialog',
  template: `
  <div *ngIf="classes$ | async as classes">
    <form [formGroup]="trainForm" (ngSubmit)="onSubmit()" class="train-form">
      <mat-form-field class="form-item">
        <mat-label>Network Architecture</mat-label>
        <mat-select formControlName="networkName">
          <mat-option *ngFor="let network of networks" [value]="network" >
            {{network}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field class="form-item">
        <input matInput type="number" placeholder="Batch Size" formControlName="batchSize">
      </mat-form-field>
      <mat-form-field class="form-item">
        <input matInput type="number" placeholder="Number of CPU Workers" formControlName="workers">
      </mat-form-field>
      <mat-form-field class="form-item">
        <input matInput type="number" placeholder="Number of Epochs" formControlName="epochs">
      </mat-form-field>
      <mat-form-field class="form-item">
        <mat-label>GPU #</mat-label>
        <mat-select formControlName="device">
          <mat-option *ngFor="let device of devices" [value]="device" >
            {{device}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-checkbox class="form-item" formControlName="parallel">Run Parallel</mat-checkbox>
      <mat-checkbox class="form-item" formControlName="mixed">Use Mixed Precision</mat-checkbox>
      <mat-checkbox class="form-item" formControlName="noWeights">Randomly Initialize Weights</mat-checkbox>
      <mat-form-field class="form-item">
        <mat-label>Diagnoses</mat-label>
        <mat-select formControlName="classes" multiple>
          <mat-option *ngFor="let diagnosis of classes" [value]="diagnosis">{{diagnosis}}</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button type="submit" class="form-item"> TRAIN </button>
    </form>
  </div>
  `,
  styleUrls: ['./train-dialog.component.scss']
})
export class TrainDialogComponent implements OnInit {
  networks = ['resnet18', 'resnet34'];
  devices = [0, 1];
  classes = [];
  classes$ = this.trainService.getClasses();

  trainForm = this.fb.group({
    batchSize: [10, Validators.required],
    workers: [2, Validators.required],
    epochs: [50, Validators.required],
    networkName: ['', Validators.required],
    device: [0],
    parallel: [false],
    mixed: [false],
    noWeights: [true],
    classes: [this.classes, Validators.required],
  });

  constructor(private fb: FormBuilder, private trainService: TrainService, private dialogRef: MatDialogRef<TrainDialogComponent>) { }

  ngOnInit() {
    this.classes$.subscribe(classes => this.classes = classes);
  }

  onSubmit() {
    this.trainService.scheduleTrainJob(this.trainForm.value).subscribe(res => alert('woohoo'));
  }

}
