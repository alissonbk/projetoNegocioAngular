import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {delay, tap} from "rxjs/operators";


import { AbstractService } from './abstract.service';
declare let alertify: any;


@Injectable({providedIn: 'root'})

export class ClientesService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
 }

  cadastrarCliente(value: any) {
    console.log(`Cliente cadastrado -> ${JSON.stringify(value)}`);
    alertify.set('notifier','delay', 2);
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('Cliente cadastrado com sucesso!');
    // this.http.post(`${this.API_URL}/v1/clientes`, value).subscribe(
    //   next => { },
    //   error => {
    //         alertify.dismissAll();
    //         alertify.set('notifier','delay', 2);
    //         alertify.set('notifier', 'position', 'top-right');
    //         alertify.error('Erro ao cadastrar cliente!');
    //         console.log(error);
    //   },
    //   () => {
    //         alertify.dismissAll();
    //         alertify.set('notifier','delay', 2);
    //         alertify.set('notifier', 'position', 'top-right');
    //         alertify.success('Cliente Cadastrado com Sucesso!');
    //   });
    
  }

  editarCliente(value: any){
    console.log(`Cliente modificado -> ${JSON.stringify(value)}`);
    alertify.set('notifier','delay', 2);
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('Cliente Modificado!');
    // this.http.put(`${this.API_URL}/v1/clientes`, value).subscribe(
    //   next => {
    //     // console.log(next);
    //   },
    //   error => {
    //     alertify.dismissAll();
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.error('Erro ao editar cliente!');
    //     console.log(error);
    //   },
    //   () => {
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.warning('Cliente modificado!');
    //   }
    // );
    
  }
  excluirCliente(id: number){
    console.log(`ID ${id} excluido!`);
    alertify.set('notifier','delay', 2);
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('Cliente Excluido!');
    // this.http.delete(`${this.API_URL}/v1/clientes`+ id).subscribe(
    //   next => {
    //     // console.log("id para excluir:", next);
    //   },
    //   error => {
    //     alertify.dismissAll();
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.error('Erro ao excluir cliente!');
    //     console.log("Error: ", error);
    //   },
    //   () => {
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.warning('Cliente Excluido!');
    //   }
    // );
    
  }
  
  getClientes(): Observable<any[]>{
    return this.http.get('../assets/mocks/mockCliente.json').pipe<any>(
      delay(1000)
    );
  }
}