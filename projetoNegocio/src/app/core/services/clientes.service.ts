import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, tap} from "rxjs/operators";


import { Cliente } from '../../shared/models/cliente';
import { AbstractService } from './abstract.service';

@Injectable({providedIn: 'root'})

export class ClientesService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
 }

  cadastrarCliente(value: any) {
    this.http.post(`${this.API_URL}/api/clientes`, value);
    console.log("cadastrar : ", value);
  }

  editarCliente(value: any){
    this.http.put(`${this.API_URL}/api/clientes`, value);
    console.log("editar : ", value);
  }
  excluirCliente(id: number){
    this.http.delete(`${this.API_URL}/api/clientes`+ id);
    console.log("deletar id: ", id);
  }
  
  getClientes(): Observable<any[]>{
    return this.http.get<any[]>('assets/mocks/mockCliente.json').pipe(
        //tap(console.log),
        catchError(this.handleError)
    );
  }
}