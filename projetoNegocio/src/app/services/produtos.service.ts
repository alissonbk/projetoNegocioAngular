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

  cadastrarProduto(value: any) {
    this.http.post(`${this.API_URL}/api/produtos`, value);
    console.log("cadastrar : ", value);
  }

  editarProduto(value: any){
    this.http.put(`${this.API_URL}/api/produtos`, value);
    console.log("editar : ", value);
  }

  excluirProduto(id: number){
    this.http.delete(`${this.API_URL}/api/produtos`+ id);
    console.log("deletar id: ", id);
  }
  
  getProdutos(): Observable<any[]>{
    return this.http.get<any[]>('assets/mockProdutos.json').pipe(
      //tap(console.log),
      catchError(this.handleError)
    )
  }
}