import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  template: `
  <mat-card class="signin-card">
    <form [formGroup]="signInForm" (ngSubmit)="signIn()" class="signin-container">
      <mat-form-field class="signin-field">
        <input matInput formControlName="email" placeholder="Email">
      </mat-form-field>
      <mat-form-field class="signin-field">
        <input matInput formControlName="password" placeholder="Password" type="password">
      </mat-form-field>
      <button mat-raised-button color="primary" class="signin-field">SIGN IN</button>
    </form>
  </mat-card>
  `,
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  signIn() {
    if (this.signInForm.valid) {
      this.auth.signIn(this.signInForm.value.email, this.signInForm.value.password).subscribe(
        (res: {token: string}) => {
          localStorage.setItem('token', res.token);
          this.auth.checkAuth();
        }, err => console.log(err)
      );
    }
  }

}
