import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainContainerComponent } from './train-container/train-container.component';
import { TrainDialogComponent } from './train-dialog/train-dialog.component';
import { SharedModule } from '../shared.module';
import { TrainInfoDialogComponent } from './train-info-dialog/train-info-dialog.component';

@NgModule({
  declarations: [TrainContainerComponent, TrainDialogComponent, TrainInfoDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TrainContainerComponent
  ],
  entryComponents: [TrainDialogComponent, TrainInfoDialogComponent]
})
export class TrainModule { }
