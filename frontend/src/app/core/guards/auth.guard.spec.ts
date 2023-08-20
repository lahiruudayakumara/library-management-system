import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create spies for AuthService and Router
    authServiceMock = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Configure TestBed
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should allow activation if the user is authenticated', () => {
    // Arrange
    authServiceMock.isAuthenticated.and.returnValue(true);
    const routeMock = {} as ActivatedRouteSnapshot;
    const stateMock = { url: '/test' } as RouterStateSnapshot;

    // Act
    const result = authGuard.canActivate(routeMock, stateMock);

    // Assert
    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should deny activation and navigate to login if the user is not authenticated', () => {
    // Arrange
    authServiceMock.isAuthenticated.and.returnValue(false);
    const routeMock = {} as ActivatedRouteSnapshot;
    const stateMock = { url: '/test' } as RouterStateSnapshot;

    // Act
    const result = authGuard.canActivate(routeMock, stateMock);

    // Assert
    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login'], {
      queryParams: { returnUrl: '/test' },
    });
  });
});
