import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sub-header',
  imports: [CommonModule],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {
  @Input() public title:string="";
  @Input() public iconClass:string="";
  @Input() public activateGoBack:boolean=false;

  @Output() onBack:EventEmitter<boolean>=new EventEmitter<boolean>();


  back(){
    this.onBack.emit(true);
  }
}
