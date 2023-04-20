import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  static ACCESS_TOKEN_KEY = 'access_token';
  static REFRESH_TOKEN_KEY = 'refresh_token';
  static USER_ID = 'user_id';

  constructor() {}

  public saveTokensAndUserId(
    accessToken: string,
    refreshToken: string,
    userId: string,
    windowStorage: Storage,
  ): void {
    this.deleteTokensAndUserId();
    windowStorage.setItem(TokenStorageService.USER_ID, userId);
    windowStorage.setItem(
      TokenStorageService.ACCESS_TOKEN_KEY,
      accessToken
    );
    windowStorage.setItem(
      TokenStorageService.REFRESH_TOKEN_KEY,
      refreshToken
    );
  }

  public defineWindowStorage(): Storage {
    if (
      window.sessionStorage.getItem(TokenStorageService.ACCESS_TOKEN_KEY) !=
      null
    ) {
      return window.sessionStorage;
    } else return window.localStorage;
  }

  public getUserId(): any {
    return this.defineWindowStorage().getItem(
      TokenStorageService.USER_ID
    );
  }

  public deleteTokensAndUserId(): void {
    this.defineWindowStorage().removeItem(
      TokenStorageService.ACCESS_TOKEN_KEY
    );
    this.defineWindowStorage().removeItem(
      TokenStorageService.REFRESH_TOKEN_KEY
    );
    this.defineWindowStorage().removeItem(TokenStorageService.USER_ID);
  }

  public getAccessToken(): any {
    return this.defineWindowStorage().getItem(
      TokenStorageService.ACCESS_TOKEN_KEY
    );
  }

  public getRefreshToken(): any {
    return this.defineWindowStorage().getItem(
      TokenStorageService.REFRESH_TOKEN_KEY
    );
  }

  public isAccessTokenPresent(): boolean {
    if (this.getAccessToken() != null) {
      return true;
    } else return false;
  }

  public getTokensAsHeaders(): any {
    let accessToken = this.getAccessToken();
    let refreshToken = this.getRefreshToken();
    if (accessToken == null || refreshToken == null) {
      return;
    } else {
      let headers = new HttpHeaders({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      return headers;
    }
  }
}
