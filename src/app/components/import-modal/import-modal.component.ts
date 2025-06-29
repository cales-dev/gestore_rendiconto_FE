import { Component, ElementRef } from '@angular/core';
import { DragAndDropFileComponent } from '../drag-and-drop-file/drag-and-drop-file.component';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CsvService } from '../../services/http/csv.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-import-modal',
  imports: [DragAndDropFileComponent, CommonModule],
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.scss'
})
export class ImportModalComponent {

  currentUserEmail!: string;
  currentFlussoId: any;
  isLoading = false;

  public title = "Importa Flusso";

  uploadFileForm = new FormGroup({
    file: new FormControl(),
    email: new FormControl(),
    nVerbali: new FormControl(),
    da: new FormControl(null, Validators.required),
    al: new FormControl(null, Validators.required),
    type: new FormControl(),
    eucarisUsername: new FormControl({value: '', disabled: true}),
    eucarisPassword: new FormControl({value: '', disabled: true}),
    vpnUsername: new FormControl({value: '', disabled: true}),
    vpnPassword: new FormControl({value: '', disabled: true}),
    privacyPolicy: new FormControl(),
    trackingStateChange: new FormControl(),
  });


  fileErrorMessage = '';

  privacyErrorMessage = '';
  eucarisPasswordErrorMessage = '';
  eucarisUsernameErrorMessage = '';

  vpnPasswordErrorMessage = '';
  vpnUsernameErrorMessage = '';

  uploadsType: string[] = [];

  hiddenEucaris = true;

  hiddenVpnCredentials = true;

  disableSubmit = true;
  uploading = false;
  hiddenProgress: any;
  lastUploadedFile: { fileName?: string; id?: string } = {};
  nomeFile: string = '';

  // editEucarisCredential = false;
  // editVPNCredential = false;

  loader: boolean = false;

  showEucarisPassword = false;

  showVPNPassword = false;
  enableEucarisCredentialsChange: boolean = false;

  selectedEnteId:string='';
  dataDa:string='';
  dataA:string='';
  operazione:string='';

  enableVpnCredentialsChange: boolean = false;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private csvService:CsvService
  ) {}

  ngOnInit() {
    this.selectedEnteId=localStorage.getItem("ente_id")!
  }

  ngAfterContentInit() {
    
  }

  initBlobConfig() {
    
  }

  getBlobServiceClient() {
    
  }

  uploadFile() {
    this.isLoading = true;
    if (this.uploadFileForm.controls.file.value) {
      const file = this.uploadFileForm.controls.file.value;
      this.csvService.uploadCsv(this.selectedEnteId, file).subscribe({
        next:()=>{
          this.isLoading=false;
          this.activeModal.close(true);
        },
        error:(error)=>{
          alert(error.error);
          this.isLoading=false;
        }
      })
    }
  }

  changeHiddenEucaris() {
    this.hiddenEucaris = !this.hiddenEucaris;
  }

  changeHiddenVpnCredentials() {
    this.hiddenVpnCredentials = !this.hiddenVpnCredentials;
  }

  checkEmailAndSendForm() {
  
  }

  submit() {
    this.checkEmailAndSendForm();
  }
}
