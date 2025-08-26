import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../../components/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor {

  constructor(private router:Router, private modalService:NgbModal) { }

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
    //Potrebbe diventare un controllo su un array di stringhe per escludere più route
    const isCheckLoginCall = request.url.includes("api/check/login/");

    //Per la chiamata di check non mostro il codice di errore
    if(!isCheckLoginCall){
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let title = '';
          let message = '';

          switch (error.status) {
            case 400:
              title = 'Errore - Bad Request (400)';
              message = 'The request was malformed.';
              break;
            case 401:
              //Quando il token scade redirect su login page
              title= 'Errore - Unauthorized (401)';
              message= 'Credenziali scadute, effettuare il login';
              this.router.navigate(['/login']);
              break;
            case 500:
              title = 'Errore - Internal Server Error (500)';
              message = 'Something went wrong on the server.';
              break;
            case 502:
              title = 'Errore - Bad Gateway (502)';
              message = 'Invalid response from the upstream server.';
              break;
            case 504:
              title = 'Errore - Gateway Timeout (504)';
              message = 'The server did not respond in time.';
              break;
            default:
              title = `Errore - Unexpected error (${error.status})`;
              message = error.message || 'An unknown error occurred.';
              break;
          }

          const modalService = this.modalService.open(ErrorModalComponent, {centered: true, size: "lg"});
          const instance: ErrorModalComponent = modalService.componentInstance;

          instance.title=title;
          instance.message=message;
          // modalService.closed.subscribe((modalResult:boolean)=>{
            
          // });
          return throwError(() => error);
        })
      );
    }else{
      return next.handle(request);
    }
;
  }

}
