import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8089/api/users';
  setLoggedIn(value: boolean): void {
    this.isLoggedIn.next(value);
  }
  
  public isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    if (this.isBrowser()) {
      const token = localStorage.getItem('accessToken');
      this.isLoggedIn.next(!!token);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  signup(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/add-user`, user).pipe(
      tap((response: AuthResponse) => {
        this.handleAuthResponse(response);
        this.router.navigate(['/']);
      })
    );
  }

  signInWithGoogle(): void {
    // Redirect to the backend OAuth2 endpoint
    window.location.href = `${this.baseUrl}/oauth2/authorization/google`;
  }
  signIn(email: string, password: string): Observable<AuthResponse> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<AuthResponse>(`${this.baseUrl}/signin`, null, { params }).pipe(
      tap(response => {
        this.handleAuthResponse(response);
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        if (error.error?.message === 'This account is banned. Please contact support.') {
          return throwError('This account is banned. Please contact support.');
        }
        return throwError('Invalid email or password');
      })
    );
  }

  private handleAuthResponse(response: AuthResponse): void {
    if (this.isBrowser()) {
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
      }
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      if (response.user) {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }
      this.isLoggedIn.next(true);
    }
  }

  private handleAuthSuccess(token: string, user: any): void {
    if (this.isBrowser()) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.isLoggedIn.next(true);
    }
  }

  getCurrentUser(): User | null {
    if (this.isBrowser()) {
      const userData = localStorage.getItem('currentUser');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      this.isLoggedIn.next(false);
      this.router.navigate(['/signin']);
    }
  }

  updateUser(id: number, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.put(`${this.baseUrl}/update-user/${id}`, userData, { headers });
  }
}