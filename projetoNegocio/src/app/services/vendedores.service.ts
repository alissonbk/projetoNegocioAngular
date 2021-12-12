import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, delay, take, tap} from "rxjs/operators";
import { Vendedor } from '../models/vendedor';
import { AbstractService } from './abstract.service';

@Injectable({providedIn: 'root'})

export class VendedoresService extends AbstractService {

  constructor(http: HttpClient){
    super(http)
  }

  cadastrarVendedor(value: any) {
    return this.http.post(`${this.API_URL}/api/usuarios`, value).pipe(take(1));
  }

  editarVendedor(value: any){
    return this.http.put(`${this.API_URL}/api/usuarios/`+ value.id, value).pipe();
  }

  excluirVendedor(id: number){
    return this.http.delete(`${this.API_URL}/api/usuarios/`+id).pipe();
  }

  getVendedores(): Observable<any[]>{
    return this.http.get(`${this.API_URL}/api/usuarios`).pipe(
      tap(console.log),
      delay(1000)
    );
  }
}