import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule} from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/login/login.module';
import { PaginaNaoEncontradaModule } from './components/pagina-nao-encontrada/pagina-nao-encontrada.module';
import { HeaderModule } from './components/shared/header/header.module';
import { MsgErroModule } from './components/shared/msg-erro/msg-erro.module';



registerLocaleData(localePt);
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
    HeaderModule,
    HttpClientModule,
    MsgErroModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    }),
    AppRoutingModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
