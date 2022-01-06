import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { ComprasService } from 'src/app/core/services/compras.service';
import { Compra } from 'src/app/shared/models/compra';
import { ComprasComponent } from '../compras.component';

@Component({
  selector: 'app-mostrar-compras',
  templateUrl: './mostrar-compras.component.html',
  styleUrls: ['./mostrar-compras.component.css']
})
export class MostrarComprasComponent implements OnInit {

  compras$!: Observable<Compra[]>;
  error$ = new Subject<boolean>();
  dataLoaded!: boolean;
  firstExecution!: boolean;
  constructor(
    private comprasService: ComprasService,
    @Inject(forwardRef(() => ComprasComponent)) private _parent: ComprasComponent
    ) { }

  //Lifecyclehooks
  ngOnInit(): void {
    this.loadCompras();
    this._parent.hideBtn = true;
    this.dataLoaded = false;
    this.firstExecution = true;
  }

  ngAfterViewInit(): void {
    window.scroll(0, 500);
  }

  ngAfterViewChecked(): void {
    if(this.dataLoaded && this.firstExecution){
      window.scroll(0,800);
      this.firstExecution = false;
    }
  }

  //Functions
  loadCompras(){
    this.compras$ = this.comprasService.getCompras().pipe(
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

  changeLoaded(){
    this.dataLoaded = true;
  }


}
