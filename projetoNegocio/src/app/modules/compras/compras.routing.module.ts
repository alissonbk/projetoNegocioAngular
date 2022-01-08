import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";


import { ComprasComponent } from "./compras.component";
import { MostrarComprasComponent } from "./mostrar-compras/mostrar-compras.component";


const ComprasRouter: Routes = [
    {path: '', component: ComprasComponent,
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