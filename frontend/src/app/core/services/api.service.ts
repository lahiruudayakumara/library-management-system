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
  getUsers(page?: number, limit?: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/users/all?page=${page}&limit=${limit}`);
  }

  addUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users/register`, data);
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/users/update/${data._id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/users/delete/${id}`);
  }

  getStaffUsers(page?: number, limit?: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/users/all-staff?page=${page}&limit=${limit}`);
  }

  getUsersCount(data: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/users/count/${data}`);
  }

  // Book API
  getBooksCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/books/count`);
  }

  getBooks(page?: number, limit?: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/books/all?page=${page}&limit=${limit}`);
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

  filterBooks(serchparams: string, page: number, limit: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/books/filter`, { search: serchparams });
  }

  // Member API
  getMembers(page?: number, limit?: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/members?page=${page}&limit=${limit}`);
  }

  registerMember(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/members/register`, data);
  }

  updateMember(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/members/${data._id}`, data);
  }

  deleteMember(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/members/${id}`);
  }

  filterMembers(serchparams: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/members/filter`, { search: serchparams });
  }
}
