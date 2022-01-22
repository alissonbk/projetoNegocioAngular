import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, delay, tap } from "rxjs/operators";


import { Compra } from "../../shared/models/compra";
import { AbstractService } from "./abstract.service";
import { LoginService } from "./login.service";
declare let alertify: any;


@Injectable({providedIn: 'root'})

export class ComprasService extends AbstractService{

    constructor(http: HttpClient,private loginService: LoginService){
        super(http)
    }

    cadastrarCompra(value: Compra){
      this.http.post(`${this.API_URL}/v1/compras`, value, {headers: this.headers}).subscribe(
          next => { },
          error => {
                alertify.dismissAll();
                alertify.set('notifier','delay', 2);
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('Erro ao cadastrar Compra!');
                console.log(error);
          },
          () => {
                alertify.dismissAll();
                alertify.set('notifier','delay', 2);
                alertify.set('notifier', 'position', 'top-right');
                alertify.success('Compra Cadastrada com Sucesso!');
          });     
    }
    
    editarCompra(value: Compra){
      this.http.put(`${this.API_URL}/v1/compras/`+ value.id, value, {headers: this.headers}).subscribe(
        next => { },
        error => {
          alertify.dismissAll();
          alertify.set('notifier','delay', 2);
          alertify.set('notifier', 'position', 'top-right');
          alertify.error('Erro ao editar compra!');
          console.log(error);
        },
        () => {
          alertify.set('notifier','delay', 2);
          alertify.set('notifier', 'position', 'top-right');
          alertify.warning('Compra modificada!');
        });
    }

    excluirCompra(value: Compra){
      let id = value.id;
      this.http.delete(`${this.API_URL}/v1/compras/`+ id, {headers: this.headers}).subscribe(
          next => { },
          error => {
            alertify.dismissAll();
            alertify.set('notifier','delay', 2);
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('Erro ao excluir compra!');
            console.log("Error: ", error);
          },
          () => {
            alertify.set('notifier','delay', 2);
            alertify.set('notifier', 'position', 'top-right');
            alertify.warning('Compra Excluida!');
          });   
    }
    
    getCompras(pageable: any): Observable<Compra[]>{
        return this.http.get<any[]>(`${this.API_URL}/v1/compras`, {headers: this.headers,params: pageable}).pipe(
            tap(console.log),
            delay(1000)
        )
    }
    
}