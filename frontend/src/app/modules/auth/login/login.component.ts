import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  Login() {
    if (this.username && this.password) {
      const data = {
        username: this.username,
        password: this.password,
      }
      this.authService.login(data).subscribe({
        // next: (response:any) => {
        //   // If login is successful, navigate to the home or dashboard page
        //   this.router.navigate(['/dashboard']); // Adjust the redirect based on your routes
        // },
        // error: (err) => {
        //   // Handle error (incorrect credentials, server errors, etc.)
        //   this.errorMessage = 'Invalid username or password.';
        // }
      });
    } else {
      this.errorMessage = 'Please fill in both fields.';
    }
  }
}
