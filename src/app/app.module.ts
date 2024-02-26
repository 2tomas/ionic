import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({  
      apiKey: "AIzaSyBd7-6dz3-3qB7CLpXy8RYyVqnnFZN-35g",
      authDomain: "ionic-proyec.firebaseapp.com",
      projectId: "ionic-proyec",
      storageBucket: "ionic-proyec.appspot.com",
      messagingSenderId: "943061853206",
      appId: "1:943061853206:web:36b2eb1407d990eb3cc137",
      measurementId: "G-RGPC51VB9J"
   })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{
    provide: FIREBASE_OPTIONS, useValue: {  
      apiKey: "AIzaSyBd7-6dz3-3qB7CLpXy8RYyVqnnFZN-35g",
      authDomain: "ionic-proyec.firebaseapp.com",
      projectId: "ionic-proyec",
      storageBucket: "ionic-proyec.appspot.com",
      messagingSenderId: "943061853206",
      appId: "1:943061853206:web:36b2eb1407d990eb3cc137",
      measurementId: "G-RGPC51VB9J"
   },
    useClass: IonicRouteStrategy,
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
