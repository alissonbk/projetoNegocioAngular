import { Injectable } from "@angular/core";
import { Compra } from "../models/compra";

@Injectable({providedIn: 'root'})

export class ComprasService{

    private compras!: Array<Compra>;

    setCompras(value: any){
        this.compras.push(value);
    }

    getCompras(): Array<Compra>{
        return this.compras;
    }
}