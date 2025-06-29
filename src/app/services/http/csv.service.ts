import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http:HttpClient) {}

  public getExportCsv(ente_id:string){
    let url=environment.baseUrl + "api/csv/export/";

    const formData=new FormData()
    formData.append("ente", ente_id);

    return this.http.post(url,formData,{
      responseType: 'blob',
      observe: 'response'
    });
  }

  public uploadCsv(ente_id:string, csv:File){
    let url=environment.baseUrl + "api/csv/upload/";

    const formData=new FormData()

    formData.append("ente", ente_id);
    formData.append("csv_file", csv);
     return this.http.post(url,formData);
  }
}
