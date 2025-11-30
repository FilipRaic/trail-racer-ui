import {HttpInterceptorFn} from '@angular/common/http';

const accessTokenKey = 'auth_token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(accessTokenKey);

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const updated = req.clone({ setHeaders: headers });
  return next(updated);
};
