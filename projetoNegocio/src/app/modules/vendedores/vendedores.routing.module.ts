import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { ClientesGuard } from "src/app/core/guards/clientes.guard";
import { MostrarVendedoresComponent } from "./mostrar-vendedores/mostrar-vendedores.component";
import { VendedoresComponent } from "./vendedores.component";


const VendedoresRouter: Routes = [
    {path: '', component: VendedoresComponent,  canActivateChild: [ClientesGuard],
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