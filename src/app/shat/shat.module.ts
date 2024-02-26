import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShatPageRoutingModule } from './shat-routing.module';

import { ShatPage } from './shat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShatPageRoutingModule
  ],
  declarations: [ShatPage]
})
export class ShatPageModule {}
