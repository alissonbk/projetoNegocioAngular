import { Component, OnInit, Inject, forwardRef, ViewChild, ElementRef } from '@angular/core';

import { ClientesComponent } from '../clientes.component';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente';
import { catchError, delay } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mostrar-clientes',
  templateUrl: './mostrar-clientes.component.html',
  styleUrls: ['./mostrar-clientes.component.css']
})
export class MostrarClientesComponent implements OnInit {

  clientes$!: Observable<Cliente[]>;
  error$ = new Subject<boolean>();
  dataLoaded!: boolean;
  firstExecution!: boolean;
  @ViewChild('content') content!: ElementRef;

  constructor(
    private clientesService: ClientesService,
    private notificationService: NotificationService,
    private router: Router,
    @Inject(forwardRef(() => ClientesComponent)) private _parent: ClientesComponent
    ) { }

  //Lifecyclehooks
  ngOnInit(): void {
    this.loadClientes();
    this._parent.hideBtn = true;
    this.dataLoaded = false;
    this.firstExecution = true;
  }

  ngAfterViewInit(): void {
    window.scroll(0, 500);
  }

  ngAfterViewChecked(): void {
    if(this.dataLoaded && this.firstExecution){
      window.scroll(0, 1150);
      this.firstExecution = false;
    }
  }

  //Functions
  loadClientes(){
    this.clientes$ = this.clientesService.getClientes().pipe(
      catchError(error => {
        console.log(error);
        if(error.status == 403){
          this.notificationService.showError('Token Expirado!');
          delay(200),
          this.router.navigate(['/login']);
        }else{
          this.error$.next(true);
          this.notificationService.showError('Falha em carregar clientes!');
        }
        return EMPTY;
      })
    );
  }

  onEdit(dados: Cliente){
    this._parent.onEdit(dados);
  }

  onDelete(dados: Cliente){
    this._parent.onDelete(dados);
  }

  changeLoaded(){
    this.dataLoaded = true;
  }


}
