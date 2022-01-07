import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ComprasComponent } from './compras.component';
import { MostrarComprasComponent } from './mostrar-compras/mostrar-compras.component';
import { ComprasRoutingModule } from './compras.routing.module';
import { MsgErroModule } from '../../shared/components/msg-erro/msg-erro.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NgxPaginationModule } from 'ngx-pagination';



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
    LoaderModule,
    NgxPaginationModule,
    ComprasRoutingModule
  ]
})
export class ComprasModule { }
