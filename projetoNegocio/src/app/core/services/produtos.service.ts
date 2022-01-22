import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, delay, tap } from "rxjs/operators";
import { Produto } from "src/app/shared/models/produto";
import { AbstractService } from "./abstract.service";
import { NotificationService } from "./notification.service";


@Injectable({providedIn: 'root'})

export class ProdutosService extends AbstractService {

  constructor(http: HttpClient,private notificationService: NotificationService){
    super(http)
  }


  cadastrarProduto(value: Produto) {
    return this.http.post(`${this.API_URL}/v1/produtos`, value, {headers: this.headers}).subscribe(
      next => {

      },
      error => {
            this.notificationService.showError('Erro ao cadastrar Produto');
            console.log(error);
      },
      () => {
            this.notificationService.showSuccess('Produto Cadastrado com Sucesso!');
      });
  }

  editarProduto(value: Produto){
    return this.http.put(`${this.API_URL}/v1/produtos/`+ value.id, value, {headers: this.headers}).subscribe(
      next => { },
      error => {
        this.notificationService.showError('Erro ao editar produto!');
        console.log(error);
      },
      () => {
        this.notificationService.showWarning('Produto modificado!');
      }
    );
  }

  excluirProduto(value: Produto){
    let id = value.id;
    return this.http.delete(`${this.API_URL}/v1/produtos/`+ id, {headers: this.headers}).subscribe(
      next => { },
      error => {
        this.notificationService.showError('Erro ao excluir produto!');
        console.log("Error: ", error);
      },
      () => {
        this.notificationService.showWarning('Produto Excluido!');
      }
    );
  }
  
  getProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.API_URL}/v1/produtos`, {headers: this.headers}).pipe(
      tap(console.log),
      delay(1000)
    );
   
  }

}