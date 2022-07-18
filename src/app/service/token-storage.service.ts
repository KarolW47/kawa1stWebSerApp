import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ID = 'user_id';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public saveUserId(userId: string): void {
    this.deleteUserId();
    window.sessionStorage.setItem(USER_ID, userId);
  }

  public deleteUserId(): void {
    window.sessionStorage.removeItem(USER_ID);
  }

  public getUserId(): any {
    return window.sessionStorage.getItem(USER_ID);
  }

  public deleteTokens(): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  public saveTokens(accessToken: string, refreshToken: string): void {
    this.deleteTokens();
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getAccessToken(): any {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public getRefreshToken(): any {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public isAccessTokenPresent(): boolean {
    if (this.getAccessToken() != null) {
      return true;
    } else return false;
  }

  public getTokensAsHeaders(): any {
    let accessToken = this.getAccessToken();
    let refreshToken = this.getRefreshToken();
    if (accessToken === null || refreshToken === null) {
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
