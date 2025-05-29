import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/http/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl('', Validators.compose([Validators.required])),
  });

  showPassword:boolean=false;
  isLoading:boolean=false;
  constructor(private router:Router, private loginService:LoginService){}

  submit(){
    this.isLoading = true;
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password || "";
    this.loginService.login(username, password).subscribe(
    {
      next:(response)=>{
        this.router.navigate(['/dashboard']);
      },
      error:(error)=>{
        this.isLoading=false;
        //TODO
      }  
    });
  }
}
