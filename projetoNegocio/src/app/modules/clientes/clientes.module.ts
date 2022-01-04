import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


import { ClientesComponent } from './clientes.component';
import { MostrarClientesComponent } from './mostrar-clientes/mostrar-clientes.component';
import { ClientesRoutingModule } from './clientes.routing.module';
import { MsgErroModule } from '../../shared/components/msg-erro/msg-erro.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';



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
    LoaderModule,
    NgxMaskModule.forChild(),
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
