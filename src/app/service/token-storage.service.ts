import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public deleteTokens(): void {
    window.sessionStorage.clear();
  }

  public saveTokens(accessToken: string, refreshToken: string ): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getAccessToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public isAccessTokenPresent(): boolean {
    if(this.getAccessToken() === null){
      return false;
    } else return true;
  }

  public getTokensAsHeaders(): any {
    let accessToken = this.getAccessToken();
    let refreshToken = this.getRefreshToken();
    if (accessToken === null || refreshToken === null) {
      return;
    } else {
      let headers = new HttpHeaders({'access_token': accessToken, 'refresh_token': refreshToken});
      return headers;
    }
  }

}
