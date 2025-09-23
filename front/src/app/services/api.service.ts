import { Injectable, provideEnvironmentInitializer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments'; 


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private base = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  // GET /api/hello
  getHello(): Observable<any> {
    return this.http.get(`${this.base}/hello`);
  }

  // POST /api/echo
  echo(payload: any): Observable<any> {
    return this.http.post(`${this.base}/echo`, payload);
  }
}
