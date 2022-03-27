import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private respAccessToken! : any;
  private respRefreshToken! : any;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  
  refeshToken(){
    return this.http.post(`${environment.apiUrl}/user/token/refresh`, this.tokenStorageService.getTokensAsHeaders, 
    {observe: 'response'}).subscribe({
        next: (resp) => {
          this.respAccessToken = resp.headers.get('access_token');
          this.respRefreshToken = resp.headers.get('refresh_token');
          this.tokenStorageService.saveTokens(this.respAccessToken, this.respRefreshToken);
        },
        error: (error) =>{
          console.log(error.status);
          console.log(error.error);
        },
      })
  }
}

