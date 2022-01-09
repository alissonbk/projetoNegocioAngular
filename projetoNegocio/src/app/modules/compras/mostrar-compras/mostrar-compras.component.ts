import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { ComprasService } from 'src/app/core/services/compras.service';
import { Compra } from 'src/app/shared/models/compra';
import { ComprasComponent } from '../compras.component';
declare let alertify: any;


@Component({
  selector: 'app-mostrar-compras',
  templateUrl: './mostrar-compras.component.html',
  styleUrls: ['./mostrar-compras.component.css']
})
export class MostrarComprasComponent implements OnInit {

  compras$!: Observable<any>;
  error$ = new Subject<boolean>();
  dataLoaded!: boolean;
  firstExecution!: boolean;
  page: number;
  currentPage: number;
  itemsPerPage: number;
  totalElements: number;

  constructor(
    private comprasService: ComprasService,
    @Inject(forwardRef(() => ComprasComponent)) private _parent: ComprasComponent
    ) {
        this.page = 1; // usado no template pagination
        this.currentPage = 0; // usado na api
        this.itemsPerPage = 10;
        this.totalElements = 0;
     }

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
    const pageable: any = {
      page: this.currentPage,
      size: this.itemsPerPage
    }
    this.compras$ = this.comprasService.getCompras(pageable).pipe(
      catchError(error => {
        console.log(error);
        this.error$.next(true);
        // ALERT
        alertify.dismissAll();
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-center');
        alertify.error('Falha em carregar clientes!');
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

  //Pagination
  pageChanged(p: number) {
    this.page = p;
    this.currentPage = this.page - 1;
    this.loadCompras();
  }

  switchFirstPage() {
    this.page = 1;
    this.currentPage = 0;
    this.loadCompras();
  }


}
