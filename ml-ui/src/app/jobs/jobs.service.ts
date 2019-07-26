import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobViewModel } from '../../../../common';
import { AppSettingsService } from '../services/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient, private appSettings: AppSettingsService) { }

  getJobs(): Observable<JobViewModel> {
    return this.http.get<JobViewModel>(this.appSettings.baseUrl + '/jobs');
  }
}
