import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { MostrarClientesComponent } from './mostrar-clientes/mostrar-clientes.component';
import { ClientesRoutingModule } from './clientes.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsgErroComponent } from '../shared/msg-erro/msg-erro.component';
import { HttpClientModule } from '@angular/common/http';
import { MsgErroModule } from '../shared/msg-erro/msg-erro.module';



@NgModule({
  declarations: [
    ClientesComponent,
    MostrarClientesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MsgErroModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
