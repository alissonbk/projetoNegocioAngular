import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { PaginaNaoEncontradaComponent } from './shared/components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  
  {path: 'clientes',
    loadChildren: ()=> import('./modules/clientes/clientes.module').then(m=> m.ClientesModule), canActivate: [AuthGuard]
    },
  {path: 'vendedores', 
    loadChildren: ()=> import('./modules/vendedores/vendedores.module').then(m=> m.VendedoresModule), canActivate: [AuthGuard]
    },
  {path: 'produtos',
    loadChildren: ()=> import('./modules/produtos/produtos.module').then(m=> m.ProdutosModule), canActivate: [AuthGuard]
    },
  {path: 'compras',
    loadChildren: ()=> import('./modules/compras/compras.module').then(m=> m.ComprasModule), canActivate: [AuthGuard]
    },
  {path: 'pesquisa', 
  loadChildren: ()=> import('./modules/pesquisa/pesquisa.module').then(m=> m.PesquisaModule), canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
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
