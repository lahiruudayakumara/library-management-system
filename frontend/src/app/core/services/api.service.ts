import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Staff API
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/users/all`);
  }

  getStaffUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/users/all-staff`);
  }

  getUsersCount(data: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/users/count/${data}`);
  }

  // Book API
  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/books/all`);
  }

  addBook(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/books/add`, data);
  }

  updateBook(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/books/${data._id}`, data);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/books/${id}`);
  }

  // Member API
  getMembers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/members`);
  }

  registerMember(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/members/register`, data);
  }
}
