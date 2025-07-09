import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import {DetailsResponse, TempInfoResponse } from '../../model/details.model';
import { ReportResponseModel } from '../../model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) {}

  public getReport(ente?:string){
    let url=environment.baseUrl + "api/report/summary/";

    if(ente){
        url+=ente;
    }
    
    return this.http.get<ReportResponseModel>(url, {withCredentials:true});
  }

  public getDetails(ente:string){
    let url=environment.baseUrl + "api/report/details/";

    if(ente){
        url+=ente;
    }
    
    return this.http.get<DetailsResponse>(url, {withCredentials:true});
  }

  public getTempData(){
    let url=environment.baseUrl + "api/report/temp/";

    return this.http.get<TempInfoResponse>(url, {withCredentials:true});
  }

  public save(){
    let url=environment.baseUrl + "api/report/save/";

    return this.http.post<any>(url, {withCredentials:true});
  }
}
