import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { ClientesGuard } from "src/app/guards/clientes.guard";
import { ComprasComponent } from "./compras.component";
import { MostrarComprasComponent } from "./mostrar-compras/mostrar-compras.component";


const ComprasRouter: Routes = [
    {path: 'compras', component: ComprasComponent,  canActivateChild: [ClientesGuard],
        children: [
            {path: 'mostrar', component: MostrarComprasComponent}
        ]

    }
] 

@NgModule({
    imports: [
        RouterModule.forChild(ComprasRouter)
    ],
    exports: [
        RouterModule
    ]
})

export class ComprasRoutingModule{ }