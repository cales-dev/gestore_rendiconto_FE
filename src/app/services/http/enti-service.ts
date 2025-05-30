import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EntiService {

  constructor(private http:HttpClient) {}

  public getEnti(){
    let url=environment.baseUrl + "api/enti/";
    return this.http.get(url, {withCredentials:true});
  }
}
