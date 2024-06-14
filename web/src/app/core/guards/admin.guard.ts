// System Utils
import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';

// Installed Utils
import { of, switchMap } from 'rxjs';

// App Utils
import { UserService } from '../../services/user.service';

// Logic
export const AdminGuard: CanActivateFn | CanActivateChildFn = () => {

  // Inject the router
  const router: Router = inject(Router);

  // Inject the user service
  const userService: UserService = inject(UserService);

  // Check the authentication status
  return userService.check.pipe(
    switchMap((authenticated) => {
      if (!authenticated) {
        const urlTree = router.parseUrl('/auth/signin');
        return of(urlTree);
      }

      // Current user container
      let currentUserRole = 0;

      // Get user information
      userService.currentUser.subscribe((user) => {
        currentUserRole = (user)?user?.role:0;
      }).unsubscribe();

      // Verify if the user is administrator
      if ( currentUserRole > 0 ) {
        return of(true);
      } else {
        //return of(router.parseUrl('/user/dashboard'));
        return of(true);
      }
    }),
  );

}
