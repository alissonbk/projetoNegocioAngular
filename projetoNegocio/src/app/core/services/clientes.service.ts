import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {delay, tap} from "rxjs/operators";


import { AbstractService } from './abstract.service';
import { Cliente } from 'src/app/shared/models/cliente';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})

export class ClientesService extends AbstractService {

  constructor(http: HttpClient, private notificationService: NotificationService, private router: Router) {
    super(http);
 }

  cadastrarCliente(value: Cliente) {
    this.http.post(`${this.API_URL}/v1/clientes`, value, {headers: this.headers}).subscribe(
      next => { },
      error => {
        this.notificationService.showError('Erro ao cadastrar cliente!');
        console.log(error);
      },
      () => {
        this.reloadPage();
        this.notificationService.showSuccess('Cliente cadastrado com sucesso!');
      });
    
  }

  editarCliente(value: Cliente){
    this.http.put(`${this.API_URL}/v1/clientes/` + value.id, value, {headers: this.headers}).subscribe(
      next => { },
      error => {
        this.notificationService.showError('Erro ao editar cliente!');
        console.log(error);
      },
      () => {
        this.reloadPage();
        this.notificationService.showWarning('Cliente Modificado!');
      }
    );
    
  }
  excluirCliente(value: Cliente){
    let id = value.id;
    this.http.delete(`${this.API_URL}/v1/clientes/`+ id, {headers: this.headers}).subscribe(
      next => { },
      error => {
        if(error.status == 500){
          this.notificationService.showErrorLonger('Cliente possui Registro(s) em Compras!!!');
        }else{
          this.notificationService.showError('Erro ao excluir cliente!');
        }
        console.log("Error: ", error);
      },
      () => {
        this.reloadPage();
        this.notificationService.showWarning('Cliente Excluido!');
      }
    );
    
  }
  
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.API_URL}/v1/clientes`, {headers: this.headers}).pipe(
      tap(console.log),
      delay(1000)
    );
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/clientes/mostrar']);
  }
}