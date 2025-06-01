import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/local/auth.service';
import { ReportService } from '../../services/http/report-service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportResponseModel, SummaryData } from '../../model/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent,CommonModule, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

  username:string="";
  isLoadingReport:boolean=true;
  loadedReport:boolean=false;
  pieData: { name: string; value: number }[] = [];
  
  constructor(public authService:AuthService, private reportService:ReportService){
    authService.userInfo$.subscribe(()=>{
      this.username=authService.getUser().username
    });

    reportService.getReport().subscribe({
      next:(res:ReportResponseModel)=>{
        this.isLoadingReport=false;
        this.pieData = res.result.map(item => ({
          name: item.rifcomune,
          value: item.totale_importo
        }));
        console.log(res);
      },
      error:(err)=>{
        this.isLoadingReport=false;
      }
    })
  }
}
