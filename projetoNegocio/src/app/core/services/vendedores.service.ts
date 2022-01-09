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

  cadastrarVendedor(value: any) {
    console.log(`Vendedor cadastrado -> ${JSON.stringify(value)}`);
    alertify.set('notifier','delay', 2);
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('Vendedor cadastrado com sucesso!');
    // return this.http.post(`${this.API_URL}/v1/usuarios`, value).subscribe(
    //   next => {
    //       // console.log(next);
    //   },
    //   error => {
    //       alertify.dismissAll();
    //       alertify.set('notifier','delay', 2);
    //       alertify.set('notifier', 'position', 'top-right');
    //       alertify.error('Erro ao cadastrar vendedor!');
    //       console.log(error);
    //   },
    //   () => {
    //       alertify.dismissAll();
    //       alertify.set('notifier','delay', 2);
    //       alertify.set('notifier', 'position', 'top-right');
    //       alertify.success('Vendedor Cadastrado com Sucesso!');
    //   });
  }

  editarVendedor(value: any){
    console.log(`Vendedor modificado -> ${JSON.stringify(value)}`);
    alertify.set('notifier','delay', 2);
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('Vendedor Modificado!');
    // return this.http.put(`${this.API_URL}/v1/usuarios/`+ value.id, value).subscribe(
    //   next => {
    //     // console.log(next);
    //   },
    //   error => {
    //     alertify.dismissAll();
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.error('Erro ao editar vendedor!');
    //     console.log(error);
    //   },
    //   () => {
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.warning('Vendedor modificado!');
    //   }
    // );
  }

  excluirVendedor(id: number){
    console.log(`ID ${id} excluido!`);
    alertify.set('notifier','delay', 2);
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning('Vendedor Excluido!');

    // return this.http.delete(`${this.API_URL}/v1/usuarios/`+id).subscribe(
    //   next => {
    //     // console.log("id para excluir:", next);
    //   },
    //   error => {
    //     alertify.dismissAll();
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.error('Erro ao excluir vendedor!');
    //     console.log("Error: ", error);
    //   },
    //   () => {
    //     alertify.set('notifier','delay', 2);
    //     alertify.set('notifier', 'position', 'top-right');
    //     alertify.warning('Vendedor Excluido!');
    //   }
    // );
  }

  getVendedores(): Observable<any[]>{
    return this.http.get('../assets/mocks/mockVendedores.json').pipe(
      tap(console.log),
      delay(1000)
    );
    // return this.http.get(`${this.API_URL}/v1/usuarios`).pipe(
    //   tap(console.log),
    //   delay(1000)
    // );
  }
}