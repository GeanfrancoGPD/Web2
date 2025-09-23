import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  login(credentials: { gmail: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(user: { gmail: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }
}
