import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/login/login.module';
import { FormsModule } from '@angular/forms';
import { PaginaNaoEncontradaModule } from './components/pagina-nao-encontrada/pagina-nao-encontrada.module';
import { ClientesModule } from './components/clientes/clientes.module';
import { ComprasModule } from './components/compras/compras.module';
import { PesquisaModule } from './components/pesquisa/pesquisa.module';
import { ProdutosModule } from './components/produtos/produtos.module';
import { VendedoresModule } from './components/vendedores/vendedores.module';
import { ClientesRoutingModule } from './components/clientes/clientes.routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HomeModule,
    LoginModule,
    PaginaNaoEncontradaModule,
    ClientesModule,
    ComprasModule,
    PesquisaModule,
    ProdutosModule,
    VendedoresModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
