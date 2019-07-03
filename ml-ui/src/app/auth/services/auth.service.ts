import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../../services/app-settings.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized = new BehaviorSubject(false);

  constructor(private http: HttpClient, private appSettings: AppSettingsService) { }

  signUp(email: string, password: string) {
    return this.http.post(this.appSettings.baseUrl + '/signup', {email, password});
  }

  signIn(email: string, password: string) {
    return this.http.post(this.appSettings.baseUrl + '/login', {email, password});
  }

  signOut() {
    localStorage.removeItem('token');
  }

  checkAuth() {
    this.http.get(this.appSettings.baseUrl).subscribe(
      res => this.isAuthorized.next(true),
      err => this.isAuthorized.next(false)
    );
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
