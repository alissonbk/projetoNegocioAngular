import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Produto } from "../models/produto";
import { AbstractService } from "./abstract.service";



@Injectable({providedIn: 'root'})

export class ProdutosService extends AbstractService {

  private produtos: Array<Produto> = new Array();

  constructor(http: HttpClient){
    super(http)
  }

  setProdutos(value: any) {
    this.produtos.push(value);
  }

  // getProdutos(): Array<Produto>{
    
  //   return this.produtos;
    
  //   //return of(); //para não retornar undefined
  // }
  getProdutos(): Observable<any[]>{
    return this.http.get<any[]>('assets/mockProdutos.json').pipe(
      tap(console.log),
      catchError(this.handleError)
    )
  }
}