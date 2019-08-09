import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../services/app-settings.service';
import { FileViewModel } from '../../../../common';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient, private appSettings: AppSettingsService) { }

  getFiles(): Observable<FileViewModel> {
    return this.http.get<any>(this.appSettings.baseUrl + '/files');
  }

  getNetworks(): Observable<any> {
    return this.http.get<any>(this.appSettings.baseUrl + '/networks');
  }

  scheduleNetowrk(networkId, uploadId): Observable<any> {
    return this.http.post<any>(this.appSettings.baseUrl + '/network/schedule', {networkId, uploadId});
  }
}
