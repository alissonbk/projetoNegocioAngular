import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {delay, tap} from "rxjs/operators";


import { AbstractService } from './abstract.service';
declare let alertify: any;
import { Cliente } from 'src/app/shared/models/cliente';


@Injectable({providedIn: 'root'})

export class ClientesService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
 }

  cadastrarCliente(value: Cliente) {
    this.http.post(`${this.API_URL}/v1/clientes`, value, {headers: this.headers}).subscribe(
      next => { },
      error => {
            alertify.dismissAll();
            alertify.set('notifier','delay', 2);
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('Erro ao cadastrar cliente!');
            console.log(error);
      },
      () => {
            alertify.dismissAll();
            alertify.set('notifier','delay', 2);
            alertify.set('notifier', 'position', 'top-right');
            alertify.success('Cliente Cadastrado com Sucesso!');
      });
    
  }

  editarCliente(value: Cliente){
    this.http.put(`${this.API_URL}/v1/clientes/` + value.id, value, {headers: this.headers}).subscribe(
      next => { },
      error => {
        alertify.dismissAll();
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Erro ao editar cliente!');
        console.log(error);
      },
      () => {
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Cliente modificado!');
      }
    );
    
  }
  excluirCliente(value: Cliente){
    let id = value.id;
    this.http.delete(`${this.API_URL}/v1/clientes/`+ id, {headers: this.headers}).subscribe(
      next => { },
      error => {
        alertify.dismissAll();
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Erro ao excluir cliente!');
        console.log("Error: ", error);
      },
      () => {
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning('Cliente Excluido!');
      }
    );
    
  }
  
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.API_URL}/v1/clientes`, {headers: this.headers}).pipe(
      tap(console.log),
      delay(1000)
    );
  }
}