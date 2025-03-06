import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [FormsModule, NgIf],
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.authService.signIn(this.email, this.password).subscribe({
      next: (response) => {
        this.handleAuthSuccess(response);
      },
      error: (error) => {
        this.handleAuthError(error);
      }
    });
  }

  signInWithGoogle() {
    this.isLoading = true;
    this.authService.signInWithGoogle();
  }

  private handleAuthSuccess(response: any) {
    if (response?.accessToken && response.user) {
      localStorage.setItem('jwtToken', response.accessToken);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      this.router.navigate(['/']);
      Swal.fire('Success', 'Signed in successfully!', 'success');
    }
    this.isLoading = false;
  }

  private handleAuthError(error: any) {
    this.isLoading = false;
    const errorMessage = error.error?.message || 'Authentication failed';
    Swal.fire('Error', errorMessage, 'error');
    console.error('Authentication error:', error);
  }

  private handleError(error: any) {
    this.isLoading = false;
    if (error.includes('blocked')) {
      Swal.fire({
        icon: 'warning',
        title: 'Popup Blocked',
        html: 'Please allow popups for this site and try again. <br> ' +
              '<button class="btn btn-link" onclick="window.location.reload()">' +
              'Reload Page' +
              '</button>',
        showConfirmButton: false
      });
    } else if (error.includes('cancelled')) {
      console.log('User closed the window intentionally');
    } else {
      Swal.fire('Error', error, 'error');
    }
  }
}