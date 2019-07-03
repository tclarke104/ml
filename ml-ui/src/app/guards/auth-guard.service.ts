import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isAuthenticated = false;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.isAuthorized.subscribe(authorized => this.isAuthenticated = authorized);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isAuthenticated) {
        return true;
    }

    // navigate to login page
    this.router.navigate(['/signin']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
