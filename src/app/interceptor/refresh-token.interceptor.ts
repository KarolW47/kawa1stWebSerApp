import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { TokenStorageService } from '../service/token-storage.service';
import { RefreshTokenService } from '../service/refresh-token.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private respAccessToken! : any;
  private respRefreshToken! : any;
  private isRefreshing = false;
  private accessTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenStorageService: TokenStorageService, private refreshTokenService: RefreshTokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenStorageService.getAccessToken()) {
      request = this.insertTokens(request, this.tokenStorageService.getAccessToken()!, this.tokenStorageService.getRefreshToken()!);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private insertTokens(request: HttpRequest<any>, accessToken: string, refreshToken: string) {
    return request.clone({
      setHeaders: {
        'access_token': `${accessToken}`,
        'refresh_token': `${refreshToken}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      
      return this.refreshTokenService.refeshToken().pipe(
        switchMap((tokens: any) => {
            this.isRefreshing = false;
            this.accessTokenSubject.next(tokens.access_token)
            this.refreshTokenSubject.next(tokens.refeshToken)
            return next.handle(this.insertTokens(request, tokens.access_token, tokens.refresh_token))
          }
        )
      )
      
// return this.refreshTokenService.refeshToken().subscribe({
//   next: (resp) => {
//     this.isRefreshing = false;
//     this.respAccessToken = this.refreshTokenSubject.next(resp.headers.get('access_token'));
//     this.respRefreshToken = this.refreshTokenSubject.next(resp.headers.get('refresh_token'));
//     this.tokenStorageService.saveTokens(this.respAccessToken, this.respRefreshToken);
//     return next.handle(this.insertTokens(request, this.respAccessToken, this.respRefreshToken))
//   },
//   error: (error) =>{
//     console.log(error.status);
//     console.log(error.error);
//   },

    } else {
      return this.refreshTokenSubject.pipe(
        filter((accessToken, refreshToken) => accessToken != null && refreshToken != null),
        take(1),
        switchMap(tokens => {
          return next.handle(this.insertTokens(request, tokens.access_token, tokens.refeshToken));
        }));
    }
  }
}
