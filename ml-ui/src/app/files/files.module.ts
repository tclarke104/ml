import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesContainerComponent } from './files-container/files-container.component';
import { SharedModule } from '../shared.module';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import { UploadModule } from '../upload/upload.module';

@NgModule({
  declarations: [FilesContainerComponent, ScheduleDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    UploadModule
  ],
  exports: [FilesContainerComponent],
  entryComponents: [ScheduleDialogComponent]
})
export class FilesModule { }
