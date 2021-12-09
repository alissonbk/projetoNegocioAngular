import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { catchError, delay, tap } from "rxjs/operators";
import { Produto } from "../models/produto";
import { AbstractService } from "./abstract.service";



@Injectable({providedIn: 'root'})

export class ProdutosService extends AbstractService {

  constructor(http: HttpClient){
    super(http)
    
  }


  // loadProdutos(){
  //   this.getProdutos().subscribe((produtos: any) => {
  //     this.data = produtos;
  //     console.log("load produtos: ", this.data);
  //   })
  //   return this.data;
  // }



  //REQUESTS TO API
  cadastrarProduto(value: any) {
    this.http.post<any>(`${this.API_URL}/api/produtos`, value, {headers: this.headers}).subscribe({
      next: data => {
        // this.produto = data;
      },
      error: error => {
        this.handleError = error.message;
      }
    });
  }

  editarProduto(value: any){
    this.http.put<any>(`${this.API_URL}/api/produtos/`+ value.id, value, {headers: this.headers}).subscribe({
      next: data => {
        // this.produto = data;
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
    // return this.http.get<any[]>(`${this.API_URL}/api/produtos`).pipe(
    //   tap(console.log),
    //   delay(1000),
    //   catchError(this.handleError)
    // );
    return this.http.get<Produto[]>(`${this.API_URL}/api/produtos`).pipe(
      tap(console.log),
      delay(1000)
    );
   
  }

}