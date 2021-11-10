import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasComponent } from './compras.component';
import { MostrarComprasComponent } from './mostrar-compras/mostrar-compras.component';
import { ComprasRoutingModule } from './compras.routing.module';



@NgModule({
  declarations: [
    ComprasComponent,
    MostrarComprasComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule
  ]
})
export class ComprasModule { }
