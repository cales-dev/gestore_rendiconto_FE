import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  imports: [],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {
  @Input() title: string = 'Errore';
  @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) {}
}
