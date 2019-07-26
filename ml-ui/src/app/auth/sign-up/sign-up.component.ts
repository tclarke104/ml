import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../validators/mustMatch.validator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  template: `
  <mat-card class="signup-card">
    <form [formGroup]="signUpForm" (ngSubmit)="signUp()" class="signup-container">
      <mat-form-field class="signup-field">
        <input matInput formControlName="email" placeholder="Email" type="email">
      </mat-form-field>
      <mat-form-field class="signup-field">
        <input matInput formControlName="password" placeholder="Password" type="password">
      </mat-form-field>
      <mat-form-field class="signup-field">
        <input matInput formControlName="confirmPassword" placeholder="Confirm Password" type="password">
      </mat-form-field>
      <button mat-raised-button color="primary" class="signup-field">SIGN UP</button>
    </form>
  </mat-card>
  `,
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit() {
  }

  matchValidator(group: FormGroup) {
    return group.controls.password.value === group.controls.passwordConfirm.value;
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value.email, this.signUpForm.value.password).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.auth.isAuthorized.next(true);
          this.router.navigate(['files']);
      });
    }
  }
}
