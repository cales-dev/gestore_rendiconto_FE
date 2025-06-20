import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SubHeaderComponent } from '../../components/sub-header/sub-header.component';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReportService } from '../../services/http/report-service';

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

  constructor( private modalService:NgbModal, private router:Router, private reportService:ReportService) {}
  
  ngOnInit(): void {
    let ente_id=localStorage.getItem("ente_id");
    if(ente_id!=null){
      this.reportService.getDetails(ente_id).subscribe({
        next:(response)=>{
          console.log(response)
          this.detailsData=response.result;
        },
        error:(error)=>{
          console.log(error)
        }
      });  
    }else{
      this.router.navigate(['dashboard'])
    }
    // this.title="Dettaglio - " + this.internalService.getOperation() + " - " + this.datePipe.transform(this.internalService.getStartDate(), 'dd/MM/yyyy') + " - " + this.datePipe.transform(this.internalService.getEndDate(),'dd/MM/yyyy');
    // this.reloadWithTemp=this.internalService.getReloadWithTemp();
    // this.loadDataSet();
  }

  formatNumbers(number:number){ 
    // number=Number(number);
    // if(number!=null){
    //   return number.toLocaleString('it-IT', {minimumFractionDigits:2, maximumFractionDigits: 2});
    // }
    // return null;
  }

  toggleFilter(field: string, popover:NgbPopover) {
    // this.currentFilterSelection=field;

    // if(!popover.isOpen()){
    //   this.currentPopOver=popover;
    //   popover.open();
    // }
  }

  resetFilter(){
    // this.isFilterActive=false;
    // this.filterStates={};
    // this.filteredData = [...this.jsonData];
  }
  
  applyFilter(search:any) {
    // if(this.filterStates[this.currentFilterSelection]==true){
    //   this.filteredData=[...this.jsonData];
    // }
    // this.filterStates[this.currentFilterSelection] = true;
    // this.isFilterActive = true;

    // if (['SpeseProcedura', 'SpesePostali', 'SpeseComando', 'Sanzione', 'Spese', 'DaRimborsare', 'Pagato'].includes(this.currentFilterSelection)) {
    //   const min = search.da == null ? Number.NEGATIVE_INFINITY : search.da;
    //   const max = search.a == null ? Number.POSITIVE_INFINITY : search.a;

    //   this.filteredData = this.jsonData.filter(row => {
    //       return row[this.currentFilterSelection] >= min && row[this.currentFilterSelection] <= max;
    //   });
    // } else {
    //   this.filteredData = this.jsonData.filter(row => {
    //       const value = row[this.currentFilterSelection]?.toString() || '';
    //       return value.includes(search.ricerca);
    //   });
    // }
  }

  prevPage(){

  }

  nextPage(){

  }

  saveCsv(){
    // if (this.canClose) {
    //   const confirmed = window.confirm("Attenzione: chiudendo la rendicontazione non sarà più possibile modificare i dati. Confermi?");
    //   if (!confirmed) {
    //     return;
    //   }
    // }
  
    // this.csvService.updateCsvTable(this.internalService.getEnte(), this.canClose).subscribe({
    //   next: () => {
    //     this.canSave = false;
    //     this.loadDataSet();
    //   },
    //   error: () => {
    //     alert("Impossibile aggiornare la tabella");
    //   }
    // });
  }

  downloadCsv(){
    // this.isDownloadingExport=true;

    // let startDate=this.internalService.getStartDate();
    // let endDate=this.internalService.getEndDate();
    // let ente=this.internalService.getEnte();
    // let isRecupero=this.internalService.getIsRecupero();
    // let eccesso=this.csvData.Eccesso;
    // let tblContratti=this.reportBckService.getTblContratti();
    // let operation=this.internalService.getOperation();
    // let selectedOperationIndex=0;

    // switch(operation){
    //   case 'Contabilizza tutto':
    //    selectedOperationIndex=0;
    //     break;
    //   case 'Contabilizza solo ordinario':
    //    selectedOperationIndex=1;  
    //     break;
    //   case 'Contabilizza solo recupero':
    //    selectedOperationIndex=2;
    //     break;
    //   default:
    //     selectedOperationIndex=0;
    //     break; 
    // }
    
    // this.csvService.getCsv(startDate,endDate,ente,isRecupero,tblContratti,this.csvData,this.reloadWithTemp, selectedOperationIndex)
    // .subscribe({
    //   next: async (resp)=>{
    //     const blob = resp.body;

    //     const contentDisposition = resp.headers.get("Content-Disposition");
    //     let filename = ente+"_"+startDate+"_"+endDate+"_export.csv"; // Default filename

    //     if (contentDisposition) {
    //         const match = contentDisposition.match(/filename="(.+)"/);
    //         if (match) filename = match[1];
    //     }

    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = filename;
    //     document.body.appendChild(link);
    //     link.click();
        
    //     document.body.removeChild(link);
    //     URL.revokeObjectURL(url);

    //     this.isDownloadingExport=false;
    //   },
    //   error:(responseError)=>{
    //     alert("Unable to download CSV file");

    //     this.isDownloadingExport=false;
    //   }
    // });

  }

  uploadCsv() {
    // const modalService = this.modalService.open(UploadFileComponent, {
    //   size: 'lg',
    // });

    // const instance: UploadFileComponent = modalService.componentInstance;

    // instance.selectedEnte=this.internalService.getEnte();
    // instance.dataDa=this.internalService.getStartDate();
    // instance.dataA=this.internalService.getEndDate();
    // instance.operazione=this.internalService.getOperation();

    // modalService.closed.subscribe((result) => {
    //   if (result) {
    //     this.canSave=true;
    //     this.reloadWithTemp=true;
    //     this.loadDataSet();
    //   }
    // })
  }
  
  showOnlyRendicontati(){
    // if (this.onlyWithOldImport) {
    //   this.filteredData  = this.filteredData.filter(item => item.OldImporto!=null); // Or any condition you want
    // }else{
    //   this.filteredData = [...this.jsonData];
    // }
  }

  showOnlyDuplicated(){
    // if (this.onlyDuplicated) {
    //   this.filteredData  = this.filteredData.filter(item => item.Duplicato!=null); // Or any condition you want
    // }else{
    //   this.filteredData = [...this.jsonData];
    // }
  }

  openDetailsPage(IDVerbale:number, Anno:string) {
    // const url = `https://${this.internalService.getEnte()}.babyloweb.eu/dettagli_verbale.php?staffID=1`;
  
    // const form = document.createElement('form');
    // form.method = 'POST';
    // form.action = url;
    // form.target = '_blank';
    // form.style.display = 'none';
  
    // const fields = {
    //   psw: 'cfd4ebf7-ef0d-47af-8209-73980bb8c5b2',
    //   comune: this.internalService.getEnte(),
    //   IDVerbale:numberRiepilogo: IDVerbale,
    //   lingua: 'IT',
    //   Anno: Anno
    // };
  
    // for (const [name, value] of Object.entries(fields)) {
    //   const input = document.createElement('input');
    //   input.type = 'hidden';
    //   input.name = name;
    //   input.value = value;
    //   form.appendChild(input);
    // }
  
    // document.body.appendChild(form);
    // form.submit();
    // document.body.removeChild(form);
  }

  loadDataSet() {
      // this.csvData=this.reportBckService.getCsvRows();
      // this.loading=true;
      // let startDate = this.internalService.getStartDate() || "";
      // let endDate = this.internalService.getEndDate() || "";
      // let ente = this.internalService.getEnte() || "";
      // let recupero = this.internalService.getIsRecupero() || false; 
      // let operation = this.internalService.getOperationIndex(); 
      
      // this.rendicontazioneService.getElencoImporti(startDate, endDate, ente, recupero, this.reloadWithTemp, operation)
      // .subscribe({
      //   next: (data) => {
      //     this.jsonData = data;
      //     this.loading=false;

      //     this.filteredData = [...data];  // Initially show all data
      //     this.filteredData.find(x=>x.Rendicontato==1) ? this.alreadyRendicontato=true : this.alreadyRendicontato=false;
      //   },
      //   error: (error) => {
      //     console.error('Error loading DataSet:', error);
      //     this.loading=false;
      //   }
      // });
  }

  returnToDetails() {
   this.router.navigate(['/dashboard']);
  }
}
