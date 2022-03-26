import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  refeshToken(){
    return this.http.post(`${environment.apiUrl}/user/token/refresh`, this.tokenStorageService.getTokensAsHeaders);
  }
}

