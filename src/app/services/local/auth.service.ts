import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged = new BehaviorSubject<boolean>(false);
  private userInfo = new BehaviorSubject<UserInfo>({} as UserInfo);
  
  userInfo$ = this.userInfo.asObservable();
  /* Metodo per impostare la sessione dell'utente dopo verifica del cookie */
  createSession(user:UserInfo){
    this.isLogged.next(true);
    this.userInfo.next(user);
  }
  
  flushSession(){
    this.isLogged.next(false);
    this.userInfo.next({} as UserInfo);
  }

  /* Metodo che ritorna lo stato del login */
  isLoggedIn(){
    return this.isLogged.getValue();
  }

  getUser(){
    return this.userInfo.getValue();
  }
}