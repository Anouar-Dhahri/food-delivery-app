import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getListOrder() {
    return this.http.get<any>(`${this.myAppUrl}/orders/get`);
  }

  validateOrder(id:string, statut:Boolean):Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}/orders/stat/${id}`, {statut});
  }

  affectOrder(id:string, employeId:any):Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}/orders/affect/${id}`, {employeId});
  }

  deleteOrder(id:string):Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}/orders/remove/${id}`);
  }

}
