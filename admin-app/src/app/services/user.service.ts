import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getListClients() {
    return this.http.get<any>(`${this.myAppUrl}/clients/get`);
  }

  activateClient(id:string, status:Boolean):Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}/clients/stat/${id}`, {status});
  }

  deleteClients(id:string):Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}/clients/remove/${id}`);
  }

}
