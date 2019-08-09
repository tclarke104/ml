import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TrainJobViewModel, EpochInfoViewModel } from '../../../../../common';
import { Observable, merge } from 'rxjs';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-train-info-dialog',
  template: `
  <div>
    <h2>JOB: {{data._id}}</h2>
    <h5>ARCHITECTURE: {{data.networkName}}</h5>
    <h5>BATCH SIZE: {{data.batchSize}}</h5>
    <h5>NUMBER OF WORKERS: {{data.workers}}</h5>
    <div *ngIf="epochInfo">
      <h5>EPOCH: {{epochInfo.currentEpoch + 1}} / {{data.epochs}}</h5>
      <h5>TEST ACCURACY {{epochInfo.testAcc}}</h5>
      <h5>TRAIN ACCURACY {{epochInfo.trainAcc}}</h5>
      <h5>TEST LOSS {{epochInfo.trainLoss}}</h5>
    </div>
  </div>
  `,
  styleUrls: ['./train-info-dialog.component.scss']
})
export class TrainInfoDialogComponent implements OnInit {
  epochInfo$: Observable<EpochInfoViewModel> = this.trainService.getJobInfo(this.data._id);
  epochInfoStream$: Observable<EpochInfoViewModel> = this.trainService.streamJobInfo(this.data._id);
  epochInfo: EpochInfoViewModel;

  constructor(private dialogRef: MatDialogRef<TrainInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TrainJobViewModel,
              private trainService: TrainService) {
    merge(this.epochInfo$, this.epochInfoStream$).subscribe((epochInfo: EpochInfoViewModel) => this.epochInfo = epochInfo);
  }

  ngOnInit() {
  }

}
