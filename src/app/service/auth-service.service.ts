import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private auth:AngularFireAuth) { }

  login(email: string, password: string) {
    return  this.auth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  async checkEmailExistence(email: string) {
    try {
      const signInMethods = await this.auth.fetchSignInMethodsForEmail(email);
      return signInMethods.length > 0;
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);
      return false;
    }
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logOut() {
    this.auth.signOut();
  }

  getAuth(){
    return this.auth.authState.pipe(map(auth=>auth));
  }
}
