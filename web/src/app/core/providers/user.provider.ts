/*
 * @provider User
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-04-10
 *
 * This provider is used to load the member data from the database
 */

// System Utils
import { ENVIRONMENT_INITIALIZER } from '@angular/core';

// App Utils
import { UserService } from '../../services/user.service';
import { TokensService } from '../../services/tokens.service';

// Get the member's data
export const initUserFactory = (userService: UserService) => {
  return () => userService.getUser();
}

// Export the provider
export const initUserProvider = () => {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    useFactory: initUserFactory,
    deps: [UserService, TokensService],
    multi: true,
  };
};
