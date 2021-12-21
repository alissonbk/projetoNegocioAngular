import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


import { VendedoresComponent } from './vendedores.component';
import { MostrarVendedoresComponent } from './mostrar-vendedores/mostrar-vendedores.component';
import { VendedoresRoutingModule } from './vendedores.routing.module';
import { MsgErroModule } from '../../shared/components/msg-erro/msg-erro.module';




@NgModule({
  declarations: [
    VendedoresComponent,
    MostrarVendedoresComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MsgErroModule,
    NgxMaskModule.forChild(),
    VendedoresRoutingModule
  ]
})
export class VendedoresModule { }
