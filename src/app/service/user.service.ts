import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from "../interface/user";
import { catchError, Observable, tap, throwError } from "rxjs";


@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    save(user: User) {
        this.http.post(`${this.apiUrl}/user/register`, user);
    }

    getUsers() : Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/user/users`);
    }

}