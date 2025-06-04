import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/local/auth.service';
import { ReportService } from '../../services/http/report-service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportResponseModel, SummaryData } from '../../model/dashboard.model';
import { SubHeaderComponent } from "../../components/sub-header/sub-header.component";
import { fromEvent } from 'rxjs';

export interface StatsDataModel{
  totale_importi:number,
  totale_verbali:number,
  media:number,
  fissoinserito?:number,
  fissospedito?:number,
  percsanzione?:number,
  fissoresponsabile?:number,
  rendicontatoperc?:number, 
}

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, CommonModule, NgxChartsModule, SubHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit{
  title:string="Report Generale";
  username:string="";
  isLoadingReport:boolean=true;
  loadedReport:boolean=false;
  isEnteselected:boolean=false;

  pieData: { name: string; value: number }[] = [];
  selectedEnte:string="";
  pieGraphTitle:string="Totale Importi per Ente";
  summaryStatsTable:string="Statistiche globali";
  // pieGraphTitle:string="Totale Importi per Ente";
  statsData:StatsDataModel={} as StatsDataModel;

  constructor(public authService:AuthService, private reportService:ReportService){
    

    
  }
  ngOnInit(): void {
    this.authService.userInfo$.subscribe(()=>{
      this.username=this.authService.getUser().username
    });

    this.isLoadingReport=true;
    this.isEnteselected=false;
    this.reportService.getReport().subscribe({
      next:(res:ReportResponseModel)=>{
        this.isLoadingReport=false;
        this.pieData = res.result.map(item => ({
          name: item.rifcomune,
          value: item.totale_importo
        }));
        
        this.statsData = this.generateStatsData(res.result);
      },
      error:(err)=>{
        this.isLoadingReport=false;
      }
    })
  }

  onEnteSelected(event:any){
    /* Quando utente click legenda invece di grafico passa solo nome ente senza oggetto, 
    conversione per resituire comunque i dati necessari */
    if(typeof event === 'string'){
      event={name:event}
    }

    this.isLoadingReport = true;
    this.title = "Report "+event.name;
    this.selectedEnte = event.name;
    this.isEnteselected = true
    this.summaryStatsTable = "Dettagli contratto"
    this.reportService.getReport(event.name).subscribe({
      next:(res:ReportResponseModel)=>{
        this.isLoadingReport=false;
        let name=res.result[0].rifcomune;
        let value=res.result[0].totale_importo;

        let data={
          name: name,
          value: value
        }

        this.pieData = [data];
        
        this.statsData.fissoinserito=res.result[0].fissoinserito;
        this.statsData.fissoresponsabile=res.result[0].fissoresponsabile;
        this.statsData.fissospedito=res.result[0].fissospedito;
        this.statsData.percsanzione=res.result[0].percsanzione;
        this.statsData.rendicontatoperc=res.result[0].rendicontatoperc;

        console.log(res);
      },
      error:(err)=>{
        this.isLoadingReport=false;
      }
    })
  }
  
  generateStatsData(array:SummaryData[]){
    let statsData:StatsDataModel={ 
      totale_importi: 0,
      totale_verbali: 0,
      media: 0
    };

    array.forEach(element => {
      statsData.totale_importi+=element.totale_importo;
      statsData.totale_verbali+=element.num_verbali;
    });
    if(statsData.totale_verbali>0){
      statsData.media = statsData.totale_importi / statsData.totale_verbali;
    }
    return statsData;
  }
  
  openDetailsPage(){

  }
}
