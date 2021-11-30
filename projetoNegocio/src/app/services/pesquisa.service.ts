import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, tap} from "rxjs/operators";


import { AbstractService } from './abstract.service';

@Injectable({providedIn: 'root'})
export class PesquisaService extends AbstractService {

  constructor(http: HttpClient) {
      super(http);
   }

  getClientes(): Observable<any[]>{
      return this.http.get<any[]>('assets/mockCliente.json').pipe(
          tap(console.log),
          catchError(this.handleError)
      );
  }


}