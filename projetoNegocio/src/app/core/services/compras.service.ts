import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { delay, tap } from "rxjs/operators";


import { Compra } from "../../shared/models/compra";
import { AbstractService } from "./abstract.service";
import { LoginService } from "./login.service";
import { NotificationService } from "./notification.service";


@Injectable({providedIn: 'root'})

export class ComprasService extends AbstractService{

    constructor(http: HttpClient,private loginService: LoginService,private notificationService: NotificationService, private router: Router){
        super(http)
    }

    cadastrarCompra(value: Compra){
      this.http.post(`${this.API_URL}/v1/compras`, value, {headers: this.headers}).subscribe(
          next => { },
          error => {
                this.notificationService.showError('Erro ao cadastrar Compra!');
                console.log(error);
          },
          () => {
            this.reloadPage();
              this.notificationService.showSuccess('Compra Cadastrada com Sucesso!');
          });     
    }
    
    editarCompra(value: Compra){
      this.http.put(`${this.API_URL}/v1/compras/`+ value.id, value, {headers: this.headers}).subscribe(
        next => { },
        error => {
          this.notificationService.showError('Erro ao editar Compra!');
          console.log(error);
        },
        () => {
          this.reloadPage();
          this.notificationService.showWarning('Compra Modificada!');
        });
    }

    excluirCompra(value: Compra){
      let id = value.id;
      this.http.delete(`${this.API_URL}/v1/compras/`+ id, {headers: this.headers}).subscribe(
          next => { },
          error => {
            this.notificationService.showError('Erro ao excluir compra!');
            console.log("Error: ", error);
          },
          () => {
            this.reloadPage();
            this.notificationService.showWarning('Compra excluida!');
          });   
    }
    
    getCompras(pageable: any): Observable<Compra[]>{
        return this.http.get<any[]>(`${this.API_URL}/v1/compras`, {headers: this.headers,params: pageable}).pipe(
            tap(console.log),
            delay(1000)
        )
    }

    reloadPage(){
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/compras/mostrar']);
    }
    
}