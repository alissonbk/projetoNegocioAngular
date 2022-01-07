import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, delay, tap } from "rxjs/operators";


import { Compra } from "../../shared/models/compra";
import { AbstractService } from "./abstract.service";


@Injectable({providedIn: 'root'})

export class ComprasService extends AbstractService{

    constructor(http: HttpClient){
        super(http)
    }

    cadastrarCompra(value: any){
        this.http.post(`${this.API_URL}/v1/compras`, value);
        console.log("cadastrar : ", value);
    }
    
    editarCompra(value: any){
        this.http.put(`${this.API_URL}/v1/compras`, value);
        console.log("editar : ", value);
    }

    excluirCompra(id: number){
        this.http.delete(`${this.API_URL}/v1/compras`+ id);
        console.log("deletar id: ", id);
    }
    
    getCompras(): Observable<any[]>{
        return this.http.get<Compra[]>('/assets/mocks/mockCompras.json').pipe(
            tap(console.log),
            delay(1000)
        )
    }
}