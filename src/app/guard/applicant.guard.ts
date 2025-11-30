import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../service/auth.service';

export const canActivateApplicant: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn && auth.currentUserRole === 'APPLICANT') {
    return true;
  }
  router.navigate(['/']).then();
  return false;
}
