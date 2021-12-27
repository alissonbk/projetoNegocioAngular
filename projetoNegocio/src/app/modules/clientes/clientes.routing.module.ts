import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { UsuariosGuard } from "src/app/core/guards/usuarios.guard";
import { ClientesComponent } from "./clientes.component";
import { MostrarClientesComponent } from "./mostrar-clientes/mostrar-clientes.component";


const routes: Routes = [
    {path: '', component: ClientesComponent,  canActivateChild: [UsuariosGuard],
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