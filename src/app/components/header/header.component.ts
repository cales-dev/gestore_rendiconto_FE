import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgbPopoverModule, NgbTooltipModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() username: string='';
  @Input() userAvatar: string='';
  @Input() isOperation: boolean = true;

  constructor(private router:Router) {}
  logout(){}

  goToSettings(){
    this.router.navigate(['/settings']);
  }
}
