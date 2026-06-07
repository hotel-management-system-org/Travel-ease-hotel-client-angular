import {inject} from '@angular/core';
import {
   HttpErrorResponse, HttpInterceptorFn
} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {CookieManagerService} from '../services/cookie/cookie-manager.service';



  export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {
  let cookieManager= inject(CookieManagerService);



  if (cookieManager.tokenExists('token')) {
    const token = cookieManager.getToken('token')
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(()=>error);
    })
  );
};
