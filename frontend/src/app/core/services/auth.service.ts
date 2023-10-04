import { AuthResponse, LoginRequest } from '../../interfaces/auth';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/users/login`, data).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, JSON.stringify(response));

        const decodedToken: any = jwtDecode(response.token);
        const role = decodedToken.role;

        switch (role) {
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          case 'Assistant':
            this.router.navigate(['/assistant']);
            break;
          case 'Librarian':
            this.router.navigate(['/librarian']);
            break;
          default:
            this.router.navigate(['/']);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.exp * 1000 > Date.now();
  }

  getToken(): string {
    const currentUser = JSON.parse(
      localStorage.getItem('token') || 'null'
    );
    return currentUser?.token;
  }

  getRole(): string {
    const token = localStorage.getItem(this.tokenKey);

    if (!token) return '';

    const decodedToken: any = jwtDecode(token);
    return decodedToken?.role;

  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  isAuthenticated(): boolean {
    const currentUser = JSON.parse(
      localStorage.getItem('token') || 'null'
    );
    return currentUser && currentUser.token ? true : false;
  }
}
