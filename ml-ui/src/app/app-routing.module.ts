import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UploadComponent } from './upload/upload/upload.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { FilesContainerComponent } from './files/files-container/files-container.component';
import { JobsComponent } from './jobs/jobs/jobs.component';
import { TrainContainerComponent } from './train/train-container/train-container.component';

const routes: Routes = [
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'upload', component: UploadComponent, canActivate: [AuthGuardService]},
  {path: 'files', component: FilesContainerComponent, canActivate: [AuthGuardService]},
  {path: 'jobs', component: JobsComponent, canActivate: [AuthGuardService]},
  {path: 'train', component: TrainContainerComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
