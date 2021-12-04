import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { ClientesGuard } from "src/app/guards/clientes.guard";
import { PesquisaClienteComponent } from "./pesquisa-cliente/pesquisa-cliente.component";
import { PesquisaCompraComponent } from "./pesquisa-compra/pesquisa-compra.component";
import { PesquisaProdutoComponent } from "./pesquisa-produto/pesquisa-produto.component";
import { PesquisaVendedorComponent } from "./pesquisa-vendedor/pesquisa-vendedor.component";
import { PesquisaComponent } from "./pesquisa.component";


const routes: Routes = [
    {path: '', component: PesquisaComponent,  canActivateChild: [ClientesGuard],
        children: [
            {path: 'pesquisaCliente', component: PesquisaClienteComponent},
            {path: 'pesquisaVendedor', component: PesquisaVendedorComponent},
            {path: 'pesquisaCompra', component: PesquisaCompraComponent},
            {path: 'pesquisaProduto', component: PesquisaProdutoComponent}
        ]

    }
] 

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class PesquisaRoutingModule{ }