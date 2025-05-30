import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor {

  constructor() { }

intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    
    const options = {
      withCredentials:true,
      headers: new HttpHeaders().set(
        'Content-Encoding',
        'gzip'
      )
    };
    
    request = request.clone(options);

    return next.handle(request);
  }

}
