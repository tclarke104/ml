import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs/jobs.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [JobsComponent],
  exports: [JobsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class JobsModule { }
