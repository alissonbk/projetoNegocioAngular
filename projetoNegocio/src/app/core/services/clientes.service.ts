import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {delay, tap} from "rxjs/operators";


import { AbstractService } from './abstract.service';

@Injectable({providedIn: 'root'})

export class ClientesService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
 }

  cadastrarCliente(value: any) {
    this.http.post(`${this.API_URL}/v1/clientes`, value);
    console.log("cadastrar : ", value);
  }

  editarCliente(value: any){
    this.http.put(`${this.API_URL}/v1/clientes`, value);
    console.log("editar : ", value);
  }
  excluirCliente(id: number){
    this.http.delete(`${this.API_URL}/v1/clientes`+ id);
    console.log("deletar id: ", id);
  }
  
  getClientes(): Observable<any[]>{
    return this.http.get('../assets/mocks/mockCliente.json').pipe(
      tap(console.log),
      delay(1000)
    );
  }
}