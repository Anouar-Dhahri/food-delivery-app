import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodmenuService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getAllMenu():Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/menus/get`);
  }

  getListMenu(id:string):Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/menus/get/${id}`);
  }

  createMenu( 
    day:any,
    name:any,
    restaurantId:string 
  ):Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}/menus/create`, { day, name, restaurantId });
  }

  updateMenu(
    id:string, 
    day:any,
    name:any
  ):Observable<any> {
    return this.http.put<any>(`${this.myAppUrl}/menus/update/${id}`, {day, name});
  }

  deleteMenu(id:string):Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}/menus/remove/${id}`);
  }
}
