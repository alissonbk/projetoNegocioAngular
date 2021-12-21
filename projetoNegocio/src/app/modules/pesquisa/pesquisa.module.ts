import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';


import { PesquisaComponent } from './pesquisa.component';
import { PesquisaClienteComponent } from './pesquisa-cliente/pesquisa-cliente.component';
import { PesquisaRoutingModule } from './pesquisa.routing.module';
import { PesquisaCompraComponent } from './pesquisa-compra/pesquisa-compra.component';
import { PesquisaProdutoComponent } from './pesquisa-produto/pesquisa-produto.component';
import { PesquisaVendedorComponent } from './pesquisa-vendedor/pesquisa-vendedor.component';


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
    NgxMaskModule,
    ReactiveFormsModule
  ]
})
export class PesquisaModule { }
