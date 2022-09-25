import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  backendUrl = 'http://localhost:7777/'
  loginFlag : boolean = false
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get(this.backendUrl + 'product/all');
  }
  getSingleProduct(id: any): Observable<any> {
    return this.http.get(this.backendUrl + `product/all/${id}`)
  }
  register(data: any): Observable<any> {
    return this.http.post(this.backendUrl + 'user/register', data)
  }
  login(data: any): Observable<any> {
    return this.http.post(this.backendUrl + 'user/login', data)
  }
  logout(token: string): Observable<any> {
    return this.http.post(this.backendUrl + 'user/logout', null, {
      headers: {
        Authorization: token
      }
    })
  }
}
