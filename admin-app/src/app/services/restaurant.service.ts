import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private myAppUrl: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getListRestaurent():Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/restaurants/get`);
  }

  createRestaurent(
    name:any,
    state:any, 
    image: any,
    speciality: any, 
    address: any, 
    phone: any
  ):Observable<any> {
    let formData = new FormData();
    formData.append('name',name)
    formData.append('state',state)
    formData.append('image',image)
    formData.append('speciality',speciality)
    formData.append('address',address)
    formData.append('phone',phone)

    return this.http.post<any>(`${this.myAppUrl}/restaurants/create`, formData);
  }

  updateRestaurent(
    id:string, 
    name:any,
    state:any, 
    image: any,
    speciality: any, 
    address: any, 
    phone: any
  ):Observable<any> {
    let formData = new FormData();
    formData.append('name',name)
    formData.append('state',state)
    formData.append('image',image)
    formData.append('speciality',speciality)
    formData.append('address',address)
    formData.append('phone',phone)
    return this.http.put<any>(`${this.myAppUrl}/restaurants/update/${id}`, formData);
  }

  deleteRestaurent(id:string):Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}/restaurants/remove/${id}`);
  }

}
