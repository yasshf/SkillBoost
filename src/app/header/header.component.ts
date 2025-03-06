import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true, // Mark the component as standalone
  imports: [CommonModule], // Import CommonModule here
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  isLoggedIn = false;
  welcomeMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    if (typeof localStorage !== 'undefined') {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (this.currentUser && this.currentUser.firstName) {
        this.isLoggedIn = true;
        this.welcomeMessage = `Welcome, ${this.currentUser.firstName}!`;
      }
    }
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.isLoggedIn = false;
    this.welcomeMessage = '';
    // Navigate to login page after logout
    this.router.navigate(['/login']);
  }
  navigateToProfile(): void {
    this.router.navigate(['/profile']); // Navigate to the profile management page
  }
}