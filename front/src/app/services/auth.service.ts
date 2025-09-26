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

  login(credentials: { name: string; password: string }): Observable<any> {
    return this.http.get(`${this.apiUrl}/login`,{
      headers: {
      'Content-Type': 'application/json',
      data: JSON.stringify(credentials)
    }} )
  }

  register(user: { gmail: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  forgotPass(credentials: { name: string}): Observable<any> {
    return this.http.get(`${this.apiUrl}/login`,{
      headers: {
      'Content-Type': 'application/json',
      data: JSON.stringify(credentials)
    }} )
  }
}
