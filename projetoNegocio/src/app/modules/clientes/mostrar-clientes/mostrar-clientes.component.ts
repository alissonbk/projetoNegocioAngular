import { Component, OnInit, Inject, forwardRef, ViewChild, ElementRef } from '@angular/core';

import { ClientesComponent } from '../clientes.component';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-mostrar-clientes',
  templateUrl: './mostrar-clientes.component.html',
  styleUrls: ['./mostrar-clientes.component.css']
})
export class MostrarClientesComponent implements OnInit {

  clientes$!: Observable<Cliente[]>;
  error$ = new Subject<boolean>();
  dataLoaded: boolean = false;
  @ViewChild('content') content!: ElementRef;

  constructor(
    private clientesService: ClientesService,
    @Inject(forwardRef(() => ClientesComponent)) private _parent: ClientesComponent
    ) { }

  ngOnInit(): void {
    this.loadClientes();
    this._parent.hideBtn = true;
  }
  ngAfterViewInit(): void {
    window.scroll(0, 500);
  }
  ngAfterViewChecked(): void {
    if(this.dataLoaded){
      window.scroll(0, 1150);
    }
  }


  loadClientes(){
    this.clientes$ = this.clientesService.getClientes().pipe(
      catchError(error => {
        console.log(error);
        this.error$.next(true);
        return EMPTY;
      })
    );
  }

  onEdit(dados: any){
    this._parent.onEdit(dados);
  }

  onDelete(dados: any){
    this._parent.onDelete(dados);
  }

  changeLoaded(){
    this.dataLoaded = true;
  }


}
