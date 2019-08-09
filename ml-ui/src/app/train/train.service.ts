import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainJobViewModel, EpochInfoViewModel } from '../../../../common';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../services/app-settings.service';
import { SocketService } from '../services/socket.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(private http: HttpClient, private appSettings: AppSettingsService, private socket: SocketService) { }

  getTrainJobs(): Observable<TrainJobViewModel[]> {
    return this.http.get<TrainJobViewModel[]>(this.appSettings.baseUrl + '/train/jobs');
  }

  streamTrainJobs(): Observable<TrainJobViewModel[]> {
    return this.socket.listen<TrainJobViewModel[]>('trainJobs');
  }

  getClasses(): Observable<string[]> {
    return this.http.get<string[]>(this.appSettings.baseUrl + '/train/classes');
  }

  scheduleTrainJob(trainJob: TrainJobViewModel): Observable<any> {
    return this.http.post(this.appSettings.baseUrl + '/train/job', trainJob);
  }

  getJobInfo(jobId: string): Observable<EpochInfoViewModel> {
    return this.http.get<EpochInfoViewModel>(this.appSettings.baseUrl + `/train/job/${jobId}`);
  }

  streamJobInfo(jobId: string): Observable<EpochInfoViewModel> {
    return this.socket.listen<EpochInfoViewModel>('epochInfo').pipe(filter(
      epochInfo => epochInfo.jobId === jobId
    ));
  }
}
