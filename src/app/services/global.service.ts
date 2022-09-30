import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  backendUrl = 'http://localhost:7777/';
  public loginFlag: boolean = false;
  public flag = false;
  public user: any = {
    userType: 'consumer',
  };
  cart: any = {};
  constructor(private http: HttpClient) {}
  getProducts(pageNumber: any, limit = 10): Observable<any> {
    return this.http.get(
      this.backendUrl + 'product/all?' + `page=${pageNumber}&limit=${limit}`
    );
  }
  getSingleProduct(id: any): Observable<any> {
    return this.http.get(this.backendUrl + `product/all/${id}`);
  }
  addProduct(data: any): Observable<any> {
    return this.http.post(this.backendUrl + 'product/add', data);
  }
  editProduct(id: any, data: any): Observable<any> {
    return this.http.put(this.backendUrl + 'product/edit/' + id, data);
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.backendUrl + 'product/delete/' + id);
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
  getUser(id: any): Observable<any> {
    return this.http.get(this.backendUrl + 'user/all/' + id);
  }
  editMe(data: any): Observable<any> {
    return this.http.put(this.backendUrl + 'user/edit', data);
  }
  deleteMe(): Observable<any> {
    return this.http.delete(this.backendUrl + 'user/delete');
  }
  getAllUsers(pageNumber: number, pageLimit: number = 10): Observable<any> {
    return this.http.get(
      this.backendUrl + `user/all?page=${pageNumber}&limit=${pageLimit}`
    );
  }
  changeStatus(id: any, status: any): Observable<any> {
    return this.http.patch(this.backendUrl + `user/status/${id}`, { status });
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.backendUrl + 'user/all/' + id);
  }
  getCategories(pageNumber: any, limit = 10): Observable<any> {
    return this.http.get(
      this.backendUrl + 'category?' + `page=${pageNumber}&limit=${limit}`
    );
  }
  addCategory(name: any): Observable<any> {
    return this.http.post(this.backendUrl + 'category', { name });
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.delete(this.backendUrl + 'category/' + id);
  }
}
