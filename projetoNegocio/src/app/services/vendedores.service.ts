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
  }

  getVendedores(): Observable<any[]>{
    return this.http.get<any[]>('assets/mockVendedores.json').pipe(
        tap(console.log),
        catchError(this.handleError)
    );
  }
}