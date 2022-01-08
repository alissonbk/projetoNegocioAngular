import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AdminGuard } from "src/app/core/guards/admin.guard";
import { MostrarVendedoresComponent } from "./mostrar-vendedores/mostrar-vendedores.component";
import { VendedoresComponent } from "./vendedores.component";


const VendedoresRouter: Routes = [
    {path: '', component: VendedoresComponent,  canActivate: [AdminGuard], canActivateChild: [AdminGuard],
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