import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Router } from 'lucide-angular';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = Inject(Router);

  // Retrieve token from localStorage
  // const token = localStorage.getItem('token');
  const token = JSON.parse(localStorage.getItem('token') || '{}').token;

  // If no token is available, return the request as is
  if (!token) {
    return next(req);
  }

  // Clone request and set Authorization header if token exists
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle request and errors
  return next(clonedRequest).pipe(
    catchError((error) => {
      // If the token is invalid or expired, handle the error (e.g., log out or redirect to login)
      if (error.status === 401 || error.status === 403) {
        // Clear token if expired or invalid
        localStorage.removeItem('token');
        // Optionally redirect to login page or show a logout notification
        router.navigate(['/login']);
      }

      throw error; // Propagate the error after handling
    })
  );
};
