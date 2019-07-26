import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
         MatCardModule,
         MatInputModule,
         MatFormFieldModule,
         MatToolbarModule,
         MatProgressBarModule,
         MatListModule,
         MatDialogModule,
         MatExpansionModule,
         MatGridListModule,
         MatSelectModule,
         MatTableModule,
         MatSnackBarModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from 'angular-file-uploader';
@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    MatListModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HttpClientModule,
    AngularFileUploaderModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
