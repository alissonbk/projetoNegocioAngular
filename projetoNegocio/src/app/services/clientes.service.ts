import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, tap} from "rxjs/operators";import { Cliente } from '../models/cliente';
import { AbstractService } from './abstract.service';

@Injectable({providedIn: 'root'})

export class ClientesService extends AbstractService {

  constructor(http: HttpClient) {
    super(http);
 }

  cadastrarClientes(value: any) {
    this.http.post(`${this.API_URL}/api/clientes`, value);
  }
  
  getClientes(): Observable<any[]>{
    return this.http.get<any[]>('assets/mockCliente.json').pipe(
        tap(console.log),
        catchError(this.handleError)
    );
  }
}