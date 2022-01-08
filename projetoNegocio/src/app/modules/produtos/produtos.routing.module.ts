import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";


import { MostrarProdutosComponent } from "./mostrar-produtos/mostrar-produtos.component";
import { ProdutosComponent } from "./produtos.component";


const ProdutosRouter: Routes = [
    {path: '', component: ProdutosComponent,
        children: [
            {path: 'mostrar', component: MostrarProdutosComponent}
        ]

    }
] 

@NgModule({
    imports: [
        RouterModule.forChild(ProdutosRouter)
    ],
    exports: [
        RouterModule
    ]
})

export class ProdutosRoutingModule{ }