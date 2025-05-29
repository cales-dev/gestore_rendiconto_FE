import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public login(username:string,password:string){
      let url=environment.baseUrl + "api/login/";
      const formData= new FormData();

      formData.append("username", username);
      formData.append("password", password);

      return this.http.post(url, formData);
  }

  public checkLogin(){
    let url=environment.baseUrl + "api/check/login/";
    return this.http.get(url, {withCredentials:true});
  }
}
