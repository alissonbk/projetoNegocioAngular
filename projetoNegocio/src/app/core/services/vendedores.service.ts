import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, delay, take, tap} from "rxjs/operators";
import { AbstractService } from './abstract.service';

@Injectable({providedIn: 'root'})

export class VendedoresService extends AbstractService {

  constructor(http: HttpClient){
    super(http)
  }

  cadastrarVendedor(value: any) {
    return this.http.post(`${this.API_URL}/v1/usuarios`, value).pipe(take(1));
  }

  editarVendedor(value: any){
    return this.http.put(`${this.API_URL}/v1/usuarios/`+ value.id, value).pipe(take(1));
  }

  excluirVendedor(id: number){
    return this.http.delete(`${this.API_URL}/v1/usuarios/`+id).pipe();
  }

  getVendedores(): Observable<any[]>{
    // return this.http.get('../assets/mocks/mockVendedores.json').pipe(
    //   tap(console.log),
    //   delay(1000)
    // );
    return this.http.get(`${this.API_URL}/v1/usuarios`).pipe(
      tap(console.log),
      delay(1000)
    );
  }
}