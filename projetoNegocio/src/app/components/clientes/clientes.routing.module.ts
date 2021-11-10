import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { ClientesGuard } from "src/app/guards/clientes.guard";
import { ClientesComponent } from "./clientes.component";
import { MostrarClientesComponent } from "./mostrar-clientes/mostrar-clientes.component";


const ClientesRouter: Routes = [
    {path: 'clientes', component: ClientesComponent,  canActivateChild: [ClientesGuard],
        children: [
            {path: 'mostrar', component: MostrarClientesComponent}
        ]

    }
] 

@NgModule({
    imports: [
        RouterModule.forChild(ClientesRouter)
    ],
    exports: [
        RouterModule
    ]
})

export class ClientesRoutingModule{ }