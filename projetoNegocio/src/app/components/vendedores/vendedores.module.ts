import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedoresComponent } from './vendedores.component';
import { MostrarVendedoresComponent } from './mostrar-vendedores/mostrar-vendedores.component';
import { VendedoresRoutingModule } from './vendedores.routing.module';



@NgModule({
  declarations: [
    VendedoresComponent,
    MostrarVendedoresComponent
  ],
  imports: [
    CommonModule,
    VendedoresRoutingModule
  ]
})
export class VendedoresModule { }
