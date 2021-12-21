import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { Vendedor } from 'src/app/shared/models/vendedor';
import { VendedoresService } from 'src/app/core/services/vendedores.service';
import { VendedoresComponent } from '../vendedores.component';

@Component({
  selector: 'app-mostrar-vendedores',
  templateUrl: './mostrar-vendedores.component.html',
  styleUrls: ['./mostrar-vendedores.component.css']
})
export class MostrarVendedoresComponent implements OnInit {

  vendedores$!: Observable<Vendedor[]>;
  error$ = new Subject<boolean>();

  constructor(
    private vendedoresService: VendedoresService,
    @Inject (forwardRef(() => VendedoresComponent)) private _parent: VendedoresComponent
    ) { }

  ngOnInit(): void {
    this.loadVendedores();
    this._parent.hideBtn = true;
  }

  loadVendedores(){
    this.vendedores$ = this.vendedoresService.getVendedores().pipe(
      catchError(error => {
        console.log(error);
        this.error$.next(true);
        return EMPTY;
      })
    )
  }

  onEdit(dados: any){
    this._parent.onEdit(dados);
  }

  onDelete(dados: any){
    this._parent.onDelete(dados);
  }

}