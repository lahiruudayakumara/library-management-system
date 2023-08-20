import { AuthService } from '../services/auth.service';
import { RoleGuard } from './role.guard';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('RoleGuard', () => {
  let roleGuard: RoleGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      // getRole: jest.fn()
    };
    const routerMock = {
      // navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    roleGuard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(roleGuard).toBeTruthy();
  });

  it('should allow access if the user role matches the expected role', () => {
    // Arrange
    const expectedRole = 'admin';
    // authService.getRole = jest.fn().mockReturnValue('admin');
    const route = { data: { role: expectedRole } };

    // Act
    const result = roleGuard.canActivate(route as any);

    // Assert
    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to unauthorized if the user role does not match the expected role', () => {
    // Arrange
    const expectedRole = 'admin';
    authService.getRole = jest.fn().mockReturnValue('user');
    const route = { data: { role: expectedRole } };

    // Act
    const result = roleGuard.canActivate(route as any);

    // Assert
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });

});
