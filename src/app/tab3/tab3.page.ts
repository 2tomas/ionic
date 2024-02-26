import { Component } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore'; // Importa AngularFireDatabase
import { Router } from '@angular/router';
import { Usuarios } from '../entity/usuarios';
import { AuthServiceService } from '../service/auth-service.service';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public usuario = new Usuarios();
  secondPassword: String = "";
  errorMessage: string = ""; 

  constructor(
    private router: Router,
    public firestore: Firestore,
    public authService : AuthServiceService,
    private androidPermissions: AndroidPermissions
  ) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
       this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
       this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE]);
   }

  async register() {
    if (this.usuario.contrasena.length < 6) {
      this.errorMessage ='Password should be at least 6 characters long.';
      return;
    }

    const userDocRef = doc(this.firestore, 'Usuario', this.usuario.email);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists() || await this.authService.checkEmailExistence(this.usuario.email) ) {
      this.errorMessage = 'User already exists. You can notify the user.';
    } else {

      if(this.secondPassword == this.usuario.contrasena){
        const usuarioData = this.usuario.toObject();

        await setDoc(userDocRef, usuarioData);
        this.authService.signup(usuarioData.email, usuarioData.contrasena)
        localStorage.setItem("usuario", usuarioData.usuario)
        this.router.navigateByUrl("/shat");
        this.errorMessage ='User registered successfully.';
      }
      this.errorMessage = 'Password is not match.';
      
    }
  }

  goToHome() {
    this.router.navigateByUrl("/"); 
  }
}
