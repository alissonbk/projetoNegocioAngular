import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MsgErroComponent } from './msg-erro.component';



@NgModule({
  declarations: [
    MsgErroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MsgErroComponent
  ]
})
export class MsgErroModule { }
