import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/local/auth.service';
import { LoginService } from './services/http/login.service';
import { filter } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestore_rendiconto';
  currentPage="";
  username="";

  constructor(private authService:AuthService, private loginService:LoginService, private router:Router){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const segments = event.urlAfterRedirects.split('/');
      this.currentPage = segments[1] || '';
    });
    
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

     this.authService.userInfo$.subscribe(()=>{
      this.username=this.authService.getUser().username
    });

  }

  
}
