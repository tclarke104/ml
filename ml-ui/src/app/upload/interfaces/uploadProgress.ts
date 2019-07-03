import { Observable } from 'rxjs'

export interface UploadProgress {
  [key: string]: { progress: Observable<number> };
}
