import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Produto } from "../models/produto";
import { AbstractService } from "./abstract.service";



@Injectable({providedIn: 'root'})

export class ProdutosService extends AbstractService {

  private produtos: Array<Produto> = new Array();
  private produto!: Produto;

  constructor(http: HttpClient){
    super(http)
  }

  cadastrarProduto(value: any) {
    this.http.post<any>(`${this.API_URL}/api/produtos`, value, {headers: this.headers}).subscribe({
      next: data => {
        this.produto = data;
      },
      error: error => {
        this.handleError = error.message;
      }
    });




  }

  editarProduto(value: any){
    this.http.put<any>(`${this.API_URL}/api/produtos/`+ value.id, value, {headers: this.headers}).subscribe({
      next: data => {
        this.produto = data;
      },
      error: error => {
        this.handleError = error.message;
      }
    });
    console.log("editar : ", value);
  }

  excluirProduto(id: number){
    this.http.delete(`${this.API_URL}/api/produtos/`+ id).subscribe();
    console.log("deletar id: ", id);
  }
  
  getProdutos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}/api/produtos`).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
    // return this.http.get<any[]>('assets/mockProdutos.json').pipe(
    //   //tap(console.log),
    //   catchError(this.handleError)
    // )
  }
}