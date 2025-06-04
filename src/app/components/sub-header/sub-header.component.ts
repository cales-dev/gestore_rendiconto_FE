import { Component, Input } from '@angular/core';

@Component({
  selector: 'sub-header',
  imports: [],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {
  @Input() public title:string="";
  @Input() public iconClass:string="";
}
