import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public deleteToken(): void {
    window.sessionStorage.clear();
  }

  public saveTokens(accessToken: string, refreshToken: string ): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public isTokenPresent(): boolean {
    if(this.getToken() === null){
      return false;
    } else return true;
  }

  public getTokenAsHeader(): any {
    let token = this.getToken();
    if (token === null) {
      return;
    } else {
      let headers = new HttpHeaders({'Authorization': token});
      return headers;
    }
  }
}
