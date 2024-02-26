import { Component } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore'; // Importa AngularFireDatabase
import { Router } from '@angular/router';
import { Usuarios } from '../entity/usuarios';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public usuario = new Usuarios();

  constructor(
    private router: Router,
    public firestore: Firestore,
    public authService : AuthServiceService
  ) { }

  async register() {
    if (this.usuario.contrasena.length < 6) {
      console.log('Password should be at least 6 characters long.');
      return;
    }
    
    const userDocRef = doc(this.firestore, 'Usuario', this.usuario.email);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists() || await this.authService.checkEmailExistence(this.usuario.email) ) {
      console.log('User already exists. You can notify the user.');
    } else {
      const usuarioData = this.usuario.toObject();

      console.log(usuarioData.email)
      console.log(usuarioData.contrasena)

      await setDoc(userDocRef, usuarioData);
      this.authService.signup(usuarioData.email, usuarioData.contrasena)
      this.router.navigateByUrl("/shat");
      console.log('User registered successfully.');
    }
  }

  goToHome() {
    this.router.navigateByUrl("/"); 
  }
}
