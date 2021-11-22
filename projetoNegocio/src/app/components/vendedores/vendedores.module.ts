import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedoresComponent } from './vendedores.component';
import { MostrarVendedoresComponent } from './mostrar-vendedores/mostrar-vendedores.component';
import { VendedoresRoutingModule } from './vendedores.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VendedoresComponent,
    MostrarVendedoresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VendedoresRoutingModule
  ]
})
export class VendedoresModule { }
