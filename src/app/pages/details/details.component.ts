import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SubHeaderComponent } from '../../components/sub-header/sub-header.component';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReportService } from '../../services/http/report.service';
import { CsvService } from '../../services/http/csv.service';
import { ImportModalComponent } from '../../components/import-modal/import-modal.component';
import { DetailsData } from '../../model/details.model';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-details',
  imports: [CommonModule, NgxChartsModule, SubHeaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  detailsData:DetailsData[]=[];
  // filteredData:DetailsModel[] = [] as DetailsModel[];
  // // jsonData:DetailsModel[] = [] as DetailsModel[];
  loading:boolean=false;
  canSave:boolean=false;
  reloadWithTemp:boolean=false;
  canClose:boolean=false;

  title:string="";
  alreadyRendicontato:boolean=false;
  isDownloadingExport:boolean=false;
  onlyWithOldImport:boolean=false;
  onlyDuplicated:boolean=false;

  isFilterActive:boolean = false;

  filterStates: { [key: string]: boolean } = {};
  ente_id:string | null="";
  ente:string | null="";
  
  constructor(private modalService:NgbModal, private router:Router, private reportService:ReportService, private csvService:CsvService) {}
  
  ngOnInit(): void {
    this.loading=true;
    this.canSave=false;
    this.ente=localStorage.getItem("ente");
    this.ente_id=localStorage.getItem("ente_id");
    if(this.ente_id!=null){
      this.reportService.getDetails(this.ente_id).subscribe({
        next:(response)=>{
          this.detailsData=[];
          this.detailsData=response.result;
          this.loading=false;
        },
        error:(error)=>{
          this.loading=false;
        }
      });  
    }else{
      this.router.navigate(['dashboard']);
    }
  }

  saveCsv(){
    const modalService = this.modalService.open(ConfirmModalComponent, {centered: true, size: "lg"});
    const instance: ConfirmModalComponent = modalService.componentInstance;

    instance.title="Conferma Salvataggio";

    modalService.closed.subscribe((modalResult:boolean)=>{
      if(modalResult){
       //Salvataggio dei dati su tblpagamenti
       this.reportService.save().subscribe({
        next:(response)=>{
          console.log(response)
          if(response.ok==true){
            //resetto la pagina e aggiorno le info
            this.ngOnInit();
          }
        },  
        error:()=>{
          
        }
       })
      }
    });
  }

  downloadCsv(){
    this.isDownloadingExport=true;
    let filename="report_ente_" + this.ente + ".csv";

    this.csvService.getExportCsv(this.ente_id!).subscribe({
      next:(res)=>{
        const blob = res.body;

        const contentDisposition = res.headers.get("Content-Disposition");

        if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+)"/);
            if (match) filename = match[1];
        }

        const url = URL.createObjectURL(blob!);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.isDownloadingExport=false;
      },
      error:()=>{}
    })
  }

  uploadCsv() {
    const modalService = this.modalService.open(ImportModalComponent, {centered: true, size: "lg"});

    modalService.closed.subscribe((res:any)=>{
      if(res){
        // Metodo per leggere i nuovi dati dalla tabella temporanea
        this.reportService.getTempData().subscribe({
          next:(response)=>{
            response.result.forEach(items => {
              let index=this.detailsData.findIndex(x=>x.id_pagamento==items.id_pagamento)
              this.detailsData[index].temp_importo=items.importo_sanzione;
              this.detailsData[index].temp_importo_pagato=items.importo_pagato;
              this.detailsData[index].temp_spesecomando=items.spese_comando;
              this.detailsData[index].temp_spesepostali=items.spese_postali;
              this.detailsData[index].temp_speseprocedura=items.spese_procedura;
              this.detailsData[index].temp_rimborso=items.da_rimborsare;

            });
            this.canSave=true;
          }
        });
      }
    });
  }
  

  returnToDetails() {
   this.router.navigate(['/dashboard']);
  }
}
