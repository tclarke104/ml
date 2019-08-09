import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar>
    <span>ML</span>
    <button mat-button *ngIf="!isAuthorized" [routerLink]="['signup']">SIGN UP</button>
    <button mat-button *ngIf="!isAuthorized" [routerLink]="['signin']">SIGN IN</button>
    <button mat-button *ngIf="isAuthorized"  [routerLink]="['files']">FILES</button>
    <button mat-button *ngIf="isAuthorized"  [routerLink]="['jobs']">JOBS</button>
    <button mat-button *ngIf="isAuthorized"  [routerLink]="['train']">TRAIN</button>
    <button mat-button *ngIf="isAuthorized" (click)="signOut()">SIGN OUT</button>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthorized: boolean;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
  }

  signOut() {
    this.auth.signOut();
  }

}
