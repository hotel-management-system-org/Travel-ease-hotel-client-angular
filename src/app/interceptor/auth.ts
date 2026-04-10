// interceptors/auth.interceptor.ts
import {inject} from '@angular/core';
import {
   HttpErrorResponse, HttpInterceptorFn
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CookieManager} from '../services/cookie/cookie-manager';



  export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {
  let cookieManager= inject(CookieManager);



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
