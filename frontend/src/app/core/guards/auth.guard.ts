import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    if (authService.isAuthenticated()) {
      return true;
    }
    return router.parseUrl('/auth/login?returnUrl=' + encodeURIComponent(state.url));
  } catch (error) {
    return router.parseUrl('/auth/login');
  }
};
