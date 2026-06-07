import {inject} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse, HttpInterceptorFn
} from '@angular/common/http';
import {catchError, switchMap, throwError} from 'rxjs';
import {CookieManagerService} from '../services/cookie/cookie-manager.service';
import {environment} from '../../../environments/environment';

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {
  let cookieManager= inject(CookieManagerService);
  const http = inject(HttpClient)

  const baseUrl = environment.baseUrl+'/user-service/api/users/visitors';
  const TOKEN_KEY = 'token';
  const REFRESH_TOKEN_KEY = 'refresh_token';

  if (cookieManager.tokenExists(TOKEN_KEY)) {
    const token = cookieManager.getToken(TOKEN_KEY)
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if( error.status === 401){
        const refreshToken = cookieManager.getToken(REFRESH_TOKEN_KEY);

        if (!refreshToken){
          return throwError(() => error);
        }

        return http.post<{assessToke: string}>(`${baseUrl}/refresh-token`, {refreshToken}).pipe(
          switchMap((response) => {
            cookieManager.set(TOKEN_KEY, response.assessToke);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.assessToke}`
              }
            });
            return next(retryReq)
          }),
          catchError((refreshError) => {
            cookieManager.clearToken(TOKEN_KEY);
            cookieManager.clearToken(REFRESH_TOKEN_KEY);
            return throwError(() => refreshError)
          })
        );
      }
      return throwError(()=>error);
    })
  );
};
