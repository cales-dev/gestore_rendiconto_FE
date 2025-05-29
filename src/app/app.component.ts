import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/local/auth.service';
import { LoginService } from './services/http/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestore_rendiconto';

  constructor(private authService:AuthService, private loginService:LoginService, private router:Router){
    this.loginService.checkLogin().subscribe({
      next:(response:any)=>{
        if(!response.logged){
          this.router.navigate(['/login']);
        }else{
          this.authService.createSession(response.user);
        }
      },
      error:()=>{
        this.router.navigate(['/login']);
        //TODO error managment
      }
    })  
  }

  
}
