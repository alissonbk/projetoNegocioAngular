import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ProdutosComponent } from './produtos.component';
import { MostrarProdutosComponent } from './mostrar-produtos/mostrar-produtos.component';
import { ProdutosRoutingModule } from './produtos.routing.module';
import { MsgErroModule } from '../../shared/components/msg-erro/msg-erro.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';



@NgModule({
  declarations: [
    ProdutosComponent,
    MostrarProdutosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MsgErroModule,
    LoaderModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
