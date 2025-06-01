import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ReportResponseModel } from '../../model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) {}

  public getReport(){
    let url=environment.baseUrl + "api/report/summary/";
    return this.http.get<ReportResponseModel>(url, {withCredentials:true});
  }
}
