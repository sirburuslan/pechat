// System Utils
import { inject } from '@angular/core';
import { Router, CanDeactivateFn } from '@angular/router';

// Installed Utils
import { of, switchMap } from 'rxjs';

// App Utils
import { UserService } from '../../services/user.service';

export interface CanComponentLeave {
  canLeave: () => boolean;
}

// Logic
export const LogoutGuard: CanDeactivateFn<CanComponentLeave> = () => {

  // Inject the router
  const router: Router = inject(Router);

  // Inject the user service
  const userService: UserService = inject(UserService);

  return userService.logout().pipe(
    switchMap(() => {
      return of(router.parseUrl('auth/signin'));
    })
  );

}
