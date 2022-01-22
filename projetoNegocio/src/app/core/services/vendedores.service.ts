import { Vendedor } from 'src/app/shared/models/vendedor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, delay, take, tap} from "rxjs/operators";
import { AbstractService } from './abstract.service';
import { NotificationService } from './notification.service';

@Injectable({providedIn: 'root'})

export class VendedoresService extends AbstractService {

  constructor(http: HttpClient, private notificationService: NotificationService){
    super(http)
  }

  cadastrarVendedor(value: Vendedor) {
    return this.http.post(`${this.API_URL}/v1/usuarios`, value, {headers: this.headers}).subscribe(
      next => { },
      error => {
          this.notificationService.showError('Erro ao cadastrar Vendedor');
          console.log(error);
      },
      () => {
          this.notificationService.showSuccess('Vendedor cadastrado com sucesso!');
      });
  }

  editarVendedor(value: Vendedor){
    return this.http.put(`${this.API_URL}/v1/usuarios/`+ value.id, value, {headers: this.headers}).subscribe(
      next => { },
      error => {
        this.notificationService.showError('Erro ao editar vendedor!');
        console.log(error);
      },
      () => {
        this.notificationService.showWarning('Vendedor Modificado!');
      }
    );
  }

  excluirVendedor(value: Vendedor){
    let id = value.id;
    return this.http.delete(`${this.API_URL}/v1/usuarios/`+id, {headers: this.headers}).subscribe(
      next => { },
      error => {
        this.notificationService.showError('Erro ao excluir Vendedor!');
        console.log("Error: ", error);
      },
      () => {
        this.notificationService.showWarning('Vendedor Excluido!');
      }
    );
  }

  getVendedores(): Observable<Vendedor[]>{
    return this.http.get(`${this.API_URL}/v1/usuarios`, {headers: this.headers}).pipe(
      tap(console.log),
      delay(1000)
    );
  }
}