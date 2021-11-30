import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {path: 'clientes',
    loadChildren: ()=> import('./components/clientes/clientes.module').then(m=> m.ClientesModule), canActivate: [AuthGuard]
    },
  {path: 'vendedores', 
    loadChildren: ()=> import('./components/vendedores/vendedores.module').then(m=> m.VendedoresModule), canActivate: [AuthGuard]
    },
  {path: 'produtos',
    loadChildren: ()=> import('./components/produtos/produtos.module').then(m=> m.ProdutosModule), canActivate: [AuthGuard]
    },
  {path: 'compras',
    loadChildren: ()=> import('./components/compras/compras.module').then(m=> m.ComprasModule), canActivate: [AuthGuard]
    },
  {path: 'pesquisa', 
  loadChildren: ()=> import('./components/pesquisa/pesquisa.module').then(m=> m.PesquisaModule), canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
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
