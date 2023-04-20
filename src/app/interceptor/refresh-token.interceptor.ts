import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { RefreshTokenService } from '../service/refresh-token.service';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private accessTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private tokenStorageService: TokenStorageService,
    private refreshTokenService: RefreshTokenService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.tokenStorageService.isAccessTokenPresent()) {
      request = this.insertTokens(
        request,
        this.tokenStorageService.getAccessToken(),
        this.tokenStorageService.getRefreshToken()
      );
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log('Refreshing token.');
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private insertTokens(
    request: HttpRequest<any>,
    accessToken: string,
    refreshToken: string
  ) {
    return request.clone({
      setHeaders: {
        access_token: `${accessToken}`,
        refresh_token: `${refreshToken}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.accessTokenSubject.next(null);
      this.refreshTokenSubject.next(null);

      return this.refreshTokenService.refeshToken().pipe(
        switchMap((resp: any) => {
          this.isRefreshing = false;
          this.accessTokenSubject.next(resp.headers.get('access_token'));
          this.refreshTokenSubject.next(resp.headers.get('refresh_token'));
          return next.handle(
            this.insertTokens(
              request,
              resp.headers.get('access_token'),
              resp.headers.get('refresh_token')
            )
          );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(
          (accessToken, refreshToken) =>
            accessToken != null && refreshToken != null
        ),
        take(1),
        switchMap((tokens) => {
          console.log('Token refreshed.');
          return next.handle(
            this.insertTokens(request, tokens.accessToken, tokens.refeshToken)
          );
        })
      );
    }
  }
}
