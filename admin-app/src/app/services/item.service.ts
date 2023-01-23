import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getListItem(id:string):Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/items/get/${id}`);
  }

  createItem( image:any,name:any, price:any, menuId:any):Observable<any> {
    let formData = new FormData();
    formData.append('image',image)
    formData.append('name',name)
    formData.append('price',price)
    formData.append('menuId',menuId)
    return this.http.post<any>(`${this.myAppUrl}/items/create`, formData);
  }

  updateItem(id:string, name:any, image:any, price:any, menuId:any):Observable<any> {
    let formData = new FormData();
    formData.append('image',image)
    formData.append('name',name)
    formData.append('price',price)
    formData.append('menuId',menuId)
    return this.http.put<any>(`${this.myAppUrl}/items/update/${id}`, formData);
  }

  deleteItem(id:string):Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}/items/remove/${id}`);
  }
}
