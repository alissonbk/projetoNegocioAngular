import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { UsuariosGuard } from "src/app/core/guards/usuarios.guard";
import { MostrarVendedoresComponent } from "./mostrar-vendedores/mostrar-vendedores.component";
import { VendedoresComponent } from "./vendedores.component";


const VendedoresRouter: Routes = [
    {path: '', component: VendedoresComponent,  canActivateChild: [UsuariosGuard],
        children: [
            {path: 'mostrar', component: MostrarVendedoresComponent}
        ]

    }
] 

@NgModule({
    imports: [
        RouterModule.forChild(VendedoresRouter)
    ],
    exports: [
        RouterModule
    ]
})

export class VendedoresRoutingModule{ }