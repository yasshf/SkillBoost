import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProfileManagementComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);

      this.profileForm = this.fb.group({
        firstName: [
          this.currentUser.firstName, 
          [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-zÀ-ÿ ]+$')]
        ],
        lastName: [
          this.currentUser.lastName, 
          [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-zÀ-ÿ ]+$')]
        ],
        email: [{ value: this.currentUser.email, disabled: true }, [Validators.required, Validators.email]],
        role: [this.currentUser.role, Validators.required],
        dateNaissance: [this.currentUser.dateNaissance, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)], // YYYY-MM-DD format
        country: [this.currentUser.country, Validators.required],
        password: ['', [Validators.minLength(6)]]
      });
    } else {
      Swal.fire('Error', 'No user found. Please log in again.', 'error');
    }
  }

  updateUser() {
    if (this.profileForm.valid) {
      const updatedData = {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        email: this.currentUser.email,
        role: this.profileForm.value.role,
        dateNaissance: this.profileForm.value.dateNaissance,
        country: this.profileForm.value.country,
        password: this.profileForm.value.password || this.currentUser.password
      };

      this.authService.updateUser(this.currentUser.id, updatedData).subscribe(
        () => {
          Swal.fire('Success', 'Profile updated successfully!', 'success');
          this.currentUser = { ...this.currentUser, ...updatedData };
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        },
        () => {
          Swal.fire('Error', 'Failed to update profile', 'error');
        }
      );
    } else {
      Swal.fire('Warning', 'Please correct the errors in the form.', 'warning');
    }
  }
}
