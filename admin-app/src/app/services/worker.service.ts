import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getListWorker():Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/employees/get`);
  }

  getListWorkerByState(etat: any):Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/employees/get/${etat}`);
  }

  createWorker(
    name:any,
    surname:any, 
    phone: any,
    email: any, 
    password: any, 
    state: any,
    restaurantId:any
  ):Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}/employees/create`, {
      name,surname, phone,email, password, state,restaurantId
    });
  }

  updateWorkerStat (id:string, disponibilite:Boolean):Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}/employees/stat/${id}`, {
      disponibilite
    });
  }

  updateWorker(
    id:string, 
    name:any,
    surname:any, 
    phone: any,
    email: any, 
    password: any, 
    state: any,
    restaurantId:any
  ):Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}/employees/update/${id}`, {
      name,surname, phone,email, password, state,restaurantId
    });
  }

  deleteWorker(id:string):Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}/employees/remove/${id}`);
  }
}
