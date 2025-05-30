import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/local/auth.service';
import { EntiService } from '../../services/http/enti-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  username:string="";
  isLoadingReport:boolean=false;

  constructor(public authService:AuthService, private entiService:EntiService){
    authService.userInfo$.subscribe(()=>{
      this.username=authService.getUser().username
    });

    entiService.getEnti().subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{

      }
    })
  }
}
