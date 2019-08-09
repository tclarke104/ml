import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../../services/app-settings.service';
import { BehaviorSubject, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized = new BehaviorSubject(false);

  constructor(private http: HttpClient, private appSettings: AppSettingsService, private router: Router, private socket: SocketService) {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.isAuthorized.next(true);
      this.socket.initSocket(token);
    } else {
      this.isAuthorized.next(false);
    }
  }

  signUp(email: string, password: string) {
    return this.http.post(this.appSettings.baseUrl + '/signup', {email, password});
  }

  signIn(email: string, password: string) {
    return this.http.post(this.appSettings.baseUrl + '/login', {email, password});
  }

  signOut() {
    localStorage.removeItem('token');
    this.isAuthorized.next(false);
    this.router.navigate(['signin']);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(!date) return false;
    return !(date.getTime() > Date.now());
  }
}
