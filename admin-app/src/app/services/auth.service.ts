import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  login(email:any, password:any) {
    return this.http.post<any>(`${this.myAppUrl}/admin/login`, { email, password });
  }

  profile(
    name:any, 
    surname:any, 
    email:any, 
    password:any, 
    id:any
  ) {
    return this.http.put<any>(`${this.myAppUrl}/admin/profile/${id}`, { name, surname, email, password });
  }
}
