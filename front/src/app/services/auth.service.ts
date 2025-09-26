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

  register(user: {username: string; email: string; password: string, confirmPassword: string  }): Observable<any> {
    console.log(user, this.apiUrl);
    return this.http.post(`${this.apiUrl}/register`,{
      headers: {
      'Content-Type': 'application/json',
      data: JSON.stringify(user)
    }});
  }

  forgotPass(credentials: { name: string}): Observable<any> {
    return this.http.get(`${this.apiUrl}/login`,{
      headers: {
      'Content-Type': 'application/json',
      data: JSON.stringify(credentials)
    }} )
  }
}
