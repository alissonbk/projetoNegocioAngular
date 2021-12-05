import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import { Vendedor } from '../models/vendedor';
import { AbstractService } from './abstract.service';

@Injectable({providedIn: 'root'})

export class VendedoresService extends AbstractService {

  constructor(http: HttpClient){
    super(http)
  }

  private vendedores: Array<Vendedor> = new Array();

  cadastrarVendedor(value: any) {
    this.http.post(`${this.API_URL}/api/vendedores`, value);
    console.log("cadastrar: ", value);
  }

  editarVendedor(value: any){
    this.http.put(`${this.API_URL}/api/vendedores`, value);
    console.log("editar : ", value);
  }

  excluirVendedor(id: number){
    this.http.delete(`${this.API_URL}/api/vendedores`+ id);
    console.log("deletar id: ", id);
  }

  getVendedores(): Observable<any[]>{
    return this.http.get<any[]>('assets/mockVendedores.json').pipe(
        //tap(console.log),
        catchError(this.handleError)
    );
  }
}