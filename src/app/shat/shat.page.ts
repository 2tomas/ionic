import { Component, ViewChild  } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-shat',
  templateUrl: './shat.page.html',
  styleUrls: ['./shat.page.scss'],
})
export class ShatPage {

  item: Observable<any[]>;
  public valor : string = "";
  usuario: any;
  user: string | null = "";

  constructor(public firestore: Firestore, public auth: AuthServiceService, private router: Router,private androidPermissions: AndroidPermissions) {
    this.user = localStorage.getItem('usuario');
    const itemCollection = collection(this.firestore, 'Mensaje');
    this.item = collectionData(itemCollection);

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
       this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
       this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE]);
    
  }
  

  agregar(){
    this.auth.getAuth().subscribe(async auth =>{
      if(auth){

        this.usuario = auth.email;

        const userDocRef = doc(this.firestore, 'Usuario', this.usuario);
        const userSnapshot = await getDoc(userDocRef);
        
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          const date = new Date()
          console.log(userData['usuario'])
          const mensajeUser = {
            usuario: userData['usuario'],
            mensaje: this.valor,
            fecha: this.agregarCero(date.getHours()) + ":" + this.agregarCero(date.getMinutes()) 
          }

          var id = (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + this.agregarCero(date.getHours()) + ":" + this.agregarCero(date.getMinutes())+ ":"  + this.agregarCero(date.getSeconds())+ ":"  + this.agregarCero(date.getMilliseconds()));
          setDoc(doc(this.firestore,'Mensaje', id.toString()), mensajeUser)
          this.valor = ""
        } 
      }
    })
  }

  agregarCero(numero: number) {
    console.log(numero)
    if (numero < 10) {
      return "0" + numero.toString();
    } else {
      return numero.toString();
    }
  }

  logout() {
    this.auth.logOut()
    this.router.navigate([""])
  }
}
