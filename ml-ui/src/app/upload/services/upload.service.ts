import { Injectable } from '@angular/core';
import { AppSettingsService } from '../../services/app-settings.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadProgress } from '../interfaces/uploadProgress';
import { Observable, Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url = `${this.appSettings.baseUrl}/upload`;
  constructor(private appSettings: AppSettingsService, private http: HttpClient) { }

  public upload(fileName, files: Set<File>): UploadProgress {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};
    const id = uuid();

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('uploadId', id);
      formData.append('fileName', fileName);
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', this.url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}
