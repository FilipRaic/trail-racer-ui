import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../service/auth.service';

export const canActivateAdmin: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn && auth.currentUserRole === 'ADMIN') {
    return true;
  }
  router.navigate(['/']).then();
  return false;
}
