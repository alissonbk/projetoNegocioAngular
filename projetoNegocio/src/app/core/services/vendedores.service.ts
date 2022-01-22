import { Vendedor } from 'src/app/shared/models/vendedor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, delay, take, tap} from "rxjs/operators";
import { AbstractService } from './abstract.service';
declare let alertify: any;

@Injectable({providedIn: 'root'})

export class VendedoresService extends AbstractService {

  constructor(http: HttpClient){
    super(http)
  }

  cadastrarVendedor(value: Vendedor) {
    return this.http.post(`${this.API_URL}/v1/usuarios`, value, {headers: this.headers}).subscribe(
      next => { },
      error => {
          alertify.dismissAll();
          alertify.set('notifier','delay', 2);
          alertify.set('notifier', 'position', 'top-right');
          alertify.error('Erro ao cadastrar vendedor!');
          console.log(error);
      },
      () => {
          alertify.dismissAll();
          alertify.set('notifier','delay', 2);
          alertify.set('notifier', 'position', 'top-right');
          alertify.success('Vendedor Cadastrado com Sucesso!');
      });
  }

  editarVendedor(value: Vendedor){
    return this.http.put(`${this.API_URL}/v1/usuarios/`+ value.id, value, {headers: this.headers}).subscribe(
      next => { },
      error => {
        alertify.dismissAll();
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Erro ao editar vendedor!');
        console.log(error);
      },
      () => {
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Vendedor modificado!');
      }
    );
  }

  excluirVendedor(value: Vendedor){
    let id = value.id;
    return this.http.delete(`${this.API_URL}/v1/usuarios/`+id, {headers: this.headers}).subscribe(
      next => { },
      error => {
        alertify.dismissAll();
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Erro ao excluir vendedor!');
        console.log("Error: ", error);
      },
      () => {
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Vendedor Excluido!');
      }
    );
  }

  getVendedores(): Observable<Vendedor[]>{
    return this.http.get(`${this.API_URL}/v1/usuarios`, {headers: this.headers}).pipe(
      tap(console.log),
      delay(1000)
    );
  }
}