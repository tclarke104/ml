import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { SharedModule } from '../shared.module';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [DialogComponent, UploadComponent],
  exports: [DialogComponent, UploadComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class UploadModule { }
