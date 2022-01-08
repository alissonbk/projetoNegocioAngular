import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";


import { ClientesComponent } from "./clientes.component";
import { MostrarClientesComponent } from "./mostrar-clientes/mostrar-clientes.component";


const routes: Routes = [
    {path: '', component: ClientesComponent,
        children: [
            {path: 'mostrar', component: MostrarClientesComponent}
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

export class ClientesRoutingModule{ }