import { AuthResponse, LoginRequest } from '../../interfaces/auth';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';
  currentUserSubject: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/users/login`, data).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, JSON.stringify(response));
        this.router.navigate([`/admin`]);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.token;
  }

  getRole(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.role;
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
