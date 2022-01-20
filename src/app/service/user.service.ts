import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from "../interface/user";
import { catchError, throwError } from "rxjs";


@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    saveUser(user: User) {
        return this.http.post<User>(`${this.apiUrl}/user/register`, user, { observe: 'response' });
    }

    getUsers() {
        return this.http.get<User[]>(`${this.apiUrl}/user/users`)
            .pipe(
                catchError(this.handleError)
            );
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