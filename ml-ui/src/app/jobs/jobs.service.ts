import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobViewModel } from '../../../../common';
import { AppSettingsService } from '../services/app-settings.service';
import { SocketService } from '../services/socket.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient, private appSettings: AppSettingsService, private socket: SocketService) { }

  getJobs(): Observable<JobViewModel[]> {
    this.socket.emit('getJobs', 'gimmie');
    return this.socket.listen<JobViewModel[]>('jobs');
  }
}
