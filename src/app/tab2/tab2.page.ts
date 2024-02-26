import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthServiceService } from '../service/auth-service.service';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

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
    public firestore: Firestore,
    private androidPermissions: AndroidPermissions) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
      
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
         this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
         this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE]);
    }

    async login() {
      const userDocRef = doc(this.firestore, 'Usuario', this.email);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
    
        if (userData['contrasena'] === this.password) {
          console.log('Login successful');
          this.authService.login(this.email, this.password)
          localStorage.setItem("usuario", userData['usuario'])
          this.router.navigateByUrl("/shat");
        } else {
          this.errorMessage ='Password is incorrect';
        }
      } else {
        this.errorMessage ='User not found';
      }
    }
  
    goToHome() {
      this.router.navigate(['/']); // Redirigir a la página principal
    }
}
