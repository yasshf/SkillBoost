import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';
import { FormsModule, NgForm } from '@angular/forms'; // 👈 Add NgForm here
import { CommonModule } from '@angular/common'; // 👈 Add this for *ngIf, etc.

@Component({
    selector: 'app-signup',
    standalone: true, // 👈 Mark the component as standalone
    imports: [FormsModule, CommonModule], // 👈 Add FormsModule and CommonModule here
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    user: User = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateNaissance: '',
        country: '',
        role: 'STUDENT'
    };

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(signupForm: NgForm) { // 👈 Use NgForm here
        if (signupForm.invalid) {
            return; // Prevent submission if the form is invalid
        }

        this.authService.signup(this.user).subscribe(
            (response) => {
                console.log('Signup successful', response);
                Swal.fire('Success', 'Account created successfully!', 'success');
                this.router.navigate(['/']); // 👈 Navigate to the root route
            },
            (error) => {
                console.error('Signup failed', error);
                Swal.fire('Error', 'Failed to create account. Please try again.', 'error');
            }
        );
    }
}