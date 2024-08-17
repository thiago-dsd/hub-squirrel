import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserControllerService } from '../../user/controller/user-controller.service';

export const studentGuard: CanActivateFn = (route, state) => {
  // Inject user controller.
  const userController = inject(UserControllerService);
  const router = inject(Router);

  // Get current user.
  const authService = inject(AuthService);

  return authService.whoAmI()
    .then(
      async () => {
        return await userController.me()
          .then(
            (user) => {
              if (
                !user || (user.role.name !== "ADMIN" && user.role.name !== "STUDENT")
              ) {
                // router.navigate(["/", "auth", "login"]);
                return router.createUrlTree(["/auth/login"]);
              }
              return true;
            }
          )
          .catch(
            (error) => {
              return router.createUrlTree(["/auth/login"]);
            }
          );
      }
    )
    .catch(
      (error) => {
        return router.createUrlTree(["/auth/login"]);
      }
    );
};

export const adminGuard: CanActivateFn = async (route, state) => {
  // Inject user controller.
  const userController = inject(UserControllerService);
  const router = inject(Router);

  // Get current user.
  const authService = inject(AuthService);

  return authService.whoAmI().then(
    async () => {
      return await userController.me()
        .then(
          (user) => {
            if (
              !user || user.role.name !== "ADMIN"
            ) {
              // router.navigate(["/", "auth", "login"]);
              return router.createUrlTree(["/auth/login"]);
            }
            return true;
          }
        )
        .catch(
          (error) => {
            return router.createUrlTree(["/auth/login"]);
          }
        );
    }
  )
    .catch(
      (error) => {
        return router.createUrlTree(["/auth/login"]);
      }
    );
};
