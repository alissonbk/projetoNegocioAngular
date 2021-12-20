import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ComprasComponent } from './compras.component';
import { MostrarComprasComponent } from './mostrar-compras/mostrar-compras.component';
import { ComprasRoutingModule } from './compras.routing.module';
import { MsgErroModule } from '../../shared/msg-erro/msg-erro.module';



@NgModule({
  declarations: [
    ComprasComponent,
    MostrarComprasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MsgErroModule,
    ComprasRoutingModule
  ]
})
export class ComprasModule { }
