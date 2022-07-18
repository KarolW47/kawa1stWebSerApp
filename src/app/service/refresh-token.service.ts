import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  refeshToken() {
    return this.http
      .post<any>(
        `${environment.apiUrl}/user/token/refresh`,
        this.tokenStorageService.getTokensAsHeaders,
        { observe: 'response' }
      )
      .pipe(
        tap((resp) => {
          this.tokenStorageService.saveTokens(
            resp.headers.get('access_token')!,
            resp.headers.get('refresh_token')!
          );
        })
      );
  }
}
