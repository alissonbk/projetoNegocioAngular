import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { catchError, delay, take, tap } from "rxjs/operators";
import { Produto } from "../../shared/models/produto";
import { AbstractService } from "./abstract.service";



@Injectable({providedIn: 'root'})

export class ProdutosService extends AbstractService {

  constructor(http: HttpClient){
    super(http)
  }


  cadastrarProduto(value: any) {
    return this.http.post(`${this.API_URL}/api/produtos`, value).pipe(take(1));
  }

  editarProduto(value: any){
    return this.http.put(`${this.API_URL}/api/produtos/`+ value.id, value).pipe();
  }

  excluirProduto(id: number){
    return this.http.delete(`${this.API_URL}/api/produtos/`+ id).pipe();
  }
  
  getProdutos(): Observable<any[]>{
    return this.http.get<Produto[]>('../assets/mocks/mockProdutos.json').pipe(
      tap(console.log),
      delay(1000)
    );
    // return this.http.get<Produto[]>(`${this.API_URL}/api/produtos`).pipe(
    //   tap(console.log),
    //   delay(1000)
    // );
   
  }

}