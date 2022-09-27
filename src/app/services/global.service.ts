import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  backendUrl = 'http://localhost:7777/';
  loginFlag: boolean = false;
  user : any
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get(this.backendUrl + 'product/all');
  }
  getSingleProduct(id: any): Observable<any> {
    return this.http.get(this.backendUrl + `product/all/${id}`);
  }
  register(data: any): Observable<any> {
    return this.http.post(this.backendUrl + 'user/register', data);
  }
  login(data: any): Observable<any> {
    return this.http.post(this.backendUrl + 'user/login', data);
  }
  logout(): Observable<any> {
    return this.http.post(this.backendUrl + 'user/logout', null);
  }
  getMe(): Observable<any> {
    return this.http.get(this.backendUrl + 'user/me');
  }
  editMe(data: any): Observable<any> {
    return this.http.put(this.backendUrl + 'user/edit', data);
  }
}
