import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaComponent } from './pesquisa.component';
import { PesquisaClienteComponent } from './pesquisa-cliente/pesquisa-cliente.component';
import { PesquisaRoutingModule } from './pesquisa.routing.module';
import { PesquisaCompraComponent } from './pesquisa-compra/pesquisa-compra.component';
import { PesquisaProdutoComponent } from './pesquisa-produto/pesquisa-produto.component';
import { PesquisaVendedorComponent } from './pesquisa-vendedor/pesquisa-vendedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    PesquisaComponent,
    PesquisaClienteComponent,
    PesquisaCompraComponent,
    PesquisaProdutoComponent,
    PesquisaVendedorComponent
  ],
  imports: [
    CommonModule,
    PesquisaRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class PesquisaModule { }
