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

  async login(credentials: { username: string; password: string }): Promise<any> {
    return await fetch(`${this.apiUrl}/login`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      data: JSON.stringify(credentials)
    }})
  }

  async register(userData: {username: string; email: string; password: string, confirmPassword: string  }): Promise<any> {
    console.log(userData, this.apiUrl);
    return await fetch(`${this.apiUrl}/register`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      data: JSON.stringify(userData)
    }})
    .then(response => response.json())
    .catch(error => {
      console.error('Error en registro', error);
    });
  }

  async forgotPass(credentials: { email: string}): Promise<any> {
    return await fetch(`${this.apiUrl}/forgotPassword`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      data: JSON.stringify(credentials)
    }} )
  }
}
