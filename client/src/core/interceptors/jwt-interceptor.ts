import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core/primitives/di';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const acountService = inject(AccountService);
  const user = acountService.currentUser();
  if (user) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    })
  }  
  return next(req);
};
