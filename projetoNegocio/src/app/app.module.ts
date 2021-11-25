import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginaNaoEncontradaModule } from './components/pagina-nao-encontrada/pagina-nao-encontrada.module';
import { PesquisaModule } from './components/pesquisa/pesquisa.module';
import { HeaderModule } from './components/shared/header/header.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HomeModule,
    LoginModule,
    PaginaNaoEncontradaModule,
    PesquisaModule,
    HeaderModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
