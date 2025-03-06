import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-oauth2-callback',
  template: `<p>Processing login...</p>`
})
export class OAuth2CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const accessToken = params['accessToken'];
      const refreshToken = params['refreshToken'];
      const currentUser = params['currentUser'];

      if (accessToken && refreshToken && currentUser) {
        // Store tokens and user in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('currentUser', currentUser);

        // Update login state
        this.authService.setLoggedIn(true);

        // Navigate to home page
        this.router.navigate(['/']);
        Swal.fire('Success', 'Signed in successfully!', 'success');
      } else if (params['error']) {
        // Handle error
        this.router.navigate(['/signin']);
        Swal.fire('Error', params['error'], 'error');
      } else {
        // Handle missing data
        this.router.navigate(['/signin']);
        Swal.fire('Error', 'Authentication failed. Please try again.', 'error');
      }
    });
  }
}