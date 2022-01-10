import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { catchError, delay, take, tap } from "rxjs/operators";
import { Produto } from "../../shared/models/produto";
import { AbstractService } from "./abstract.service";
declare let alertify: any;


@Injectable({providedIn: 'root'})

export class ProdutosService extends AbstractService {

  constructor(http: HttpClient){
    super(http)
  }


  cadastrarProduto(value: any) {
    console.log(`Produto cadastrado -> ${JSON.stringify(value)}`);
    alertify.set('notifier','delay', 2);
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('Produto cadastrado com sucesso!');
    // return this.http.post(`${this.API_URL}/v1/produtos`, value, {headers: this.headers}).subscribe(
    //   next => {

    //   },
    //   error => {
    //         alertify.dismissAll();
    //         alertify.set('notifier','delay', 2);
    //         alertify.set('notifier', 'position', 'top-right');
    //         alertify.error('Erro ao cadastrar produto!');
    //         console.log(error);
    //   },
    //   () => {
    //         alertify.dismissAll();
    //         alertify.set('notifier','delay', 2);
    //         alertify.set('notifier', 'position', 'top-right');
    //         alertify.success('Produto Cadastrado com Sucesso!');
    //   });
  }

  editarProduto(value: any){
    console.log(`Produto modificado -> ${JSON.stringify(value)}`);
    alertify.set('notifier','delay', 2);
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('Produto Modificado!');
    // return this.http.put(`${this.API_URL}/v1/produtos/`+ value.id, value, {headers: this.headers}).subscribe(
    //   next => {
    //     // console.log(next);
    //   },
    //   error => {
    //     alertify.dismissAll();
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.error('Erro ao editar produto!');
    //     console.log(error);
    //   },
    //   () => {
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.warning('Produto modificado!');
    //   }
    // );
  }

  excluirProduto(id: number){
    console.log(`ID ${id} excluido!`);
    alertify.set('notifier','delay', 2);
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('Produto Excluido!');
    // return this.http.delete(`${this.API_URL}/v1/produtos/`+ id, {headers: this.headers}).subscribe(
    //   next => {
    //     // console.log("id para excluir:", next);
    //   },
    //   error => {
    //     alertify.dismissAll();
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.error('Erro ao excluir produto!');
    //     console.log("Error: ", error);
    //   },
    //   () => {
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.warning('Produto Excluido!');
    //   }
    // );
  }
  
  getProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>('../assets/mocks/mockProdutos.json').pipe<any>(
      delay(1000)
    );
    // return this.http.get<Produto[]>(`${this.API_URL}/v1/produtos`, {headers: this.headers}).pipe(
    //   tap(console.log),
    //   delay(1000)
    // );
   
  }

}