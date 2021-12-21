import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


import { ClientesComponent } from './clientes.component';
import { MostrarClientesComponent } from './mostrar-clientes/mostrar-clientes.component';
import { ClientesRoutingModule } from './clientes.routing.module';
import { MsgErroModule } from '../../shared/components/msg-erro/msg-erro.module';



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
    NgxMaskModule.forChild(),
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
