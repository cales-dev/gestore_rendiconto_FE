import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SubHeaderComponent } from '../../components/sub-header/sub-header.component';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReportService } from '../../services/http/report.service';
import { CsvService } from '../../services/http/csv.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, NgxChartsModule, SubHeaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  detailsData:any[]=[];
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
  
  constructor( private modalService:NgbModal, private router:Router, private reportService:ReportService, private csvService:CsvService) {}
  
  ngOnInit(): void {
    this.ente=localStorage.getItem("ente");
    this.ente_id=localStorage.getItem("ente_id");
    if(this.ente_id!=null){
      this.reportService.getDetails(this.ente_id).subscribe({
        next:(response)=>{
          console.log(response);
          this.detailsData=response.result;
        },
        error:(error)=>{
          console.log(error);
        }
      });  
    }else{
      this.router.navigate(['dashboard']);
    }
  }

  formatNumbers(number:number){ 
   
  }

  toggleFilter(field: string, popover:NgbPopover) {
    
  }

  resetFilter(){
    
  }
  
  applyFilter(search:any) {

  }

  prevPage(){

  }

  nextPage(){

  }

  saveCsv(){

  }

  downloadCsv(){
    this.isDownloadingExport=true;
    let filename="report_ente_" + this.ente + ".csv";

    this.csvService.getExportCsv(this.ente_id!).subscribe({
      next:(res)=>{
        const blob = res.body;

        const contentDisposition = res.headers.get("Content-Disposition");

        if (contentDisposition) {
            console.log(contentDisposition)
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
      error:()=>{

      }
    })
  }

  uploadCsv() {
  }
  
  showOnlyRendicontati(){
  }

  showOnlyDuplicated(){
  }

  openDetailsPage(IDVerbale:number, Anno:string) {
  }

  loadDataSet() {
  }

  returnToDetails() {
   this.router.navigate(['/dashboard']);
  }
}
