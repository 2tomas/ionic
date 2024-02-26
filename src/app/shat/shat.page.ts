import { Component, ViewChild  } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shat',
  templateUrl: './shat.page.html',
  styleUrls: ['./shat.page.scss'],
})
export class ShatPage {

  item: Observable<any[]>;
  public valor : string = "";
  usuario: any;

  constructor(public firestore: Firestore, public auth: AuthServiceService, private router: Router,) {
    const itemCollection = collection(this.firestore, 'Mensaje');
    this.item = collectionData(itemCollection);

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
            fecha: date.getHours() + ":" + date.getMinutes()
          }

          var id = (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes()+ ":"  + date.getSeconds()+ ":"  + date.getMilliseconds());
          setDoc(doc(this.firestore,'Mensaje', id.toString()), mensajeUser)
          this.valor = ""
        } 
      }
    })
  }

  logout() {
    this.auth.logOut()
    this.router.navigate([""])
  }
}
