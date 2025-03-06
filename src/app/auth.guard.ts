import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1), // Take the latest value and complete
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true; // Allow access to the route
        } else {
          // Redirect to the sign-in page if not logged in
          this.router.navigate(['/signin']);
          return false; // Block access to the route
        }
      })
    );
  }
}