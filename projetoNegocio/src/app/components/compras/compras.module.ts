import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasComponent } from './compras.component';
import { MostrarComprasComponent } from './mostrar-compras/mostrar-compras.component';
import { ComprasRoutingModule } from './compras.routing.module';
import { HeaderModule } from '../shared/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ComprasComponent,
    MostrarComprasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComprasRoutingModule
  ]
})
export class ComprasModule { }
