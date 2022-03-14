import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from "../interface/user";
import { catchError, throwError } from "rxjs";
import { TokenStorageService } from "./token-storage.service";


@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

    saveUser(user: User) {
        return this.http.post<User>(`${this.apiUrl}/user/register`, user, { observe: 'response' });
    }

    getUsers() {
        return this.http.get<User[]>(`${this.apiUrl}/user/users`, {headers: this.tokenStorageService.getTokensAsHeaders()})
            .pipe(
                catchError(this.handleError)
            );
    }

    logUserIn(user: User) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        let body = new HttpParams();
        body = body.set('username', user.username);
        body = body.set('password', user.password);
        return this.http.post<any>(`${this.apiUrl}/user/login`, body , {
            headers: myheader, observe: 'response' });
    }

    logUserOut() {
        this.tokenStorageService.deleteTokens();
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
    }

}