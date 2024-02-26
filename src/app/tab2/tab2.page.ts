import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  email: string = "";
  password: string = "";
  errorMessage: string = ""; 

  constructor( 
    public router : Router,
    public authService : AuthServiceService,
    public firestore: Firestore) {}

    async login() {
      const userDocRef = doc(this.firestore, 'Usuario', this.email);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
    
        if (userData['contrasena'] === this.password) {
          console.log('Login successful');
          this.authService.login(this.email, this.password)
          this.router.navigateByUrl("/shat");
        } else {
          console.log('Password is incorrect');
        }
      } else {
        console.log('User not found');
      }
    }
  
    goToHome() {
      this.router.navigate(['/']); // Redirigir a la página principal
    }
}
