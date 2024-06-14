// System Utils
import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';

// Installed Utils
import { of, switchMap } from 'rxjs';

// App Utils
import { UserService } from '../../services/user.service';

// Logic
export const AuthGuard: CanActivateFn | CanActivateChildFn = () => {

  // Inject the router
  const router: Router = inject(Router);

  // Inject the user service
  const userService: UserService = inject(UserService);

  // Check the authentication status
  return userService.check.pipe(
    switchMap((authenticated) => {
      if (authenticated) {
        // Current user container
        let currentUserRole = 0;
        // Get user information
        userService.currentUser.subscribe((user) => {
          currentUserRole = (user)?user?.role:0;
        }).unsubscribe();
        // Verify if the user is administrator
        if ( currentUserRole < 1 ) {
          return of(router.parseUrl('/admin/dashboard'));
        } else {
          //return of(router.parseUrl('/user/dashboard'));
        }
      }
      return of(true);
    })
  );

}
