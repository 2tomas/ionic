import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router, private authService : AuthServiceService) {
    this.authService.getAuth().subscribe(async auth =>{
      if(auth){
        this.router.navigate(["/shat"])
      }
    })
  }

  login() {
    this.router.navigate(['/login'])
    console.log('Iniciando sesión...');
  }

  register() {
    this.router.navigate(['/register'])
    console.log('Registrándose...');
  }
}
