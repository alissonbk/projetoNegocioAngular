import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { MostrarProdutosComponent } from './mostrar-produtos/mostrar-produtos.component';
import { ProdutosRoutingModule } from './produtos.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProdutosComponent,
    MostrarProdutosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
