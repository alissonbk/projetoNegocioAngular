import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientesGuard } from './guards/clientes.guard';

const routes: Routes = [
  
  {path: 'clientes',
    loadChildren: ()=> import('./components/clientes/clientes.module').then(m=> m.ClientesModule),
    },
  {path: 'vendedores', 
    loadChildren: ()=> import('./components/vendedores/vendedores.module').then(m=> m.VendedoresModule),
    },
  {path: 'produtos', 
    loadChildren: ()=> import('./components/produtos/produtos.module').then(m=> m.ProdutosModule), 
    },
  {path: 'compras', 
    loadChildren: ()=> import('./components/compras/compras.module').then(m=> m.ComprasModule), 
    },
  //{path: 'login', component: LoginComponent},
  {path: 'pesquisa', component: PesquisaComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: '**', component: PaginaNaoEncontradaComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
