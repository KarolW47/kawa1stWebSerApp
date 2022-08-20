import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interface/user';
import { TokenStorageService } from './token-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getUser(userId: number) {
    return this.http.get<User>(`${environment.apiUrl}/user/profile`, {
      params: new HttpParams().set('user_id', userId),
      headers: this.tokenStorageService.getTokensAsHeaders(),
    });
  }

  saveUser(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/user/register`, user, {
      observe: 'response',
    });
  }

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/user/users`, {
      headers: this.tokenStorageService.getAccessToken(),
    });
  }

  logUserIn(login: string, password: string) {
    let parameters = new HttpParams();
    parameters = parameters.set('login', login);
    parameters = parameters.set('password', password);
    return this.http.post<any>(`${environment.apiUrl}/user/login`, parameters, {
      observe: 'response',
    });
  }

  logUserOut() {
    this.tokenStorageService.deleteTokens();
    this.tokenStorageService.deleteUserId();
  }

  deleteUser(confirmationPassword: string) {
    return this.http.delete(`${environment.apiUrl}/user/profile/delete`, {
      params: new HttpParams().set(
        'confirmationPassword',
        confirmationPassword
      ),
      headers: this.tokenStorageService.getAccessToken(),
      observe: 'response',
    });
  }

  changeAboutMeInfo(aboutMeInfo: string) {
    if (aboutMeInfo === null || aboutMeInfo === '') {
      aboutMeInfo = ' ';
    }
    return this.http.patch(
      `${environment.apiUrl}/user/profile/about_me_info/change`,
      aboutMeInfo,
      {
        headers: this.tokenStorageService.getAccessToken(),
        observe: 'response',
      }
    );
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.patch(
      `${environment.apiUrl}/user/profile/password/change`,
      [oldPassword, newPassword],
      {
        headers: this.tokenStorageService.getAccessToken(),
      }
    );
  }

  changeUsername(username: string) {
    return this.http.patch(
      `${environment.apiUrl}/user/profile/username/change`,
      username,
      {
        headers: this.tokenStorageService.getAccessToken(),
      }
    );
  }

  resetPassword(emailAddress: string) {
    return this.http.post(
      `${environment.apiUrl}/user/reset_password`,
      emailAddress
    );
  }

  verifyResetPasswordToken(resetPasswordToken: string) {
    return this.http.get(`${environment.apiUrl}/user/change_password`, {
      params: new HttpParams().set('resetPaswordToken', resetPasswordToken),
      observe: 'response',
    });
  }

  changePasswordViaResetToken(resetPasswordToken: string, newPassword: string) {
    return this.http.patch(
      `${environment.apiUrl}/user/change_password`,
      newPassword,
      {
        params: new HttpParams().set('resetPasswordToken', resetPasswordToken),
      }
    );
  }
}
