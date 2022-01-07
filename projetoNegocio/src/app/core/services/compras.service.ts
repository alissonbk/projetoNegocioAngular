import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, delay, tap } from "rxjs/operators";


import { Compra } from "../../shared/models/compra";
import { AbstractService } from "./abstract.service";
import { LoginService } from "./login.service";


@Injectable({providedIn: 'root'})

export class ComprasService extends AbstractService{

    constructor(http: HttpClient,private loginService: LoginService){
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
    
    getCompras(pageable: any): Observable<any>{
        return this.http.get<Compra[]>('/assets/mocks/mockCompras.json').pipe(
            tap(console.log),
            delay(1000)
        )
        // return this.http.get<any[]>(`${this.API_URL}/v1/compras`, {headers: this.headers,params: pageable}).pipe(
        //     tap(console.log),
        //     delay(1000)
        // )
    }
    
}