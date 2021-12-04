import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Compra } from "../models/compra";
import { AbstractService } from "./abstract.service";

@Injectable({providedIn: 'root'})

export class ComprasService extends AbstractService{

    constructor(http: HttpClient){
        super(http)
    }

    private compras!: Array<any>;

    setCompras(value: any){
        this.compras.push(value);
    }

    // getCompras(): Array<Compra>{
    //     return this.compras;
    // }

    getCompras(): Observable<any[]>{
        return this.http.get<any[]>('assets/mockCompras.json').pipe(
            tap(console.log),
            catchError(this.handleError)
        )
    }
}