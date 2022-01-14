import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { ProdutosService } from 'src/app/core/services/produtos.service';
import { ProdutosComponent } from '../produtos.component';
import { Produto } from 'src/app/shared/models/produto';
declare let alertify: any;


@Component({
  selector: 'app-mostrar-produtos',
  templateUrl: './mostrar-produtos.component.html',
  styleUrls: ['./mostrar-produtos.component.css']
})
export class MostrarProdutosComponent implements OnInit {

  produtos$!: Observable<Produto[]>;
  error$ = new Subject<boolean>();
  dataLoaded!: boolean;
  firstExecution!: boolean;

  constructor(
    private produtosService: ProdutosService,
    @Inject(forwardRef(() => ProdutosComponent)) private _parent: ProdutosComponent,
    private router: Router
    ) { 
    }

  //Lifecyclehooks
  ngOnInit(): void {
    this.loadProdutos();
    this._parent.hideBtn = true;
    this.dataLoaded = false;
    this.firstExecution = true;
  }

  ngAfterViewInit(): void {
    window.scroll(0, 500);
  }
  
  ngAfterViewChecked(): void {
    if(this.dataLoaded && this.firstExecution){
      window.scroll(0, 800);
      this.firstExecution = false;
    }
  }

  //Functions
  loadProdutos(){
    this.produtos$ = this.produtosService.getProdutos().pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        // ALERT
        alertify.dismissAll();
        alertify.set('notifier','delay', 2);
        alertify.set('notifier', 'position', 'top-center');
        alertify.error('Falha em carregar clientes!');
        return EMPTY;
      })
    );
  }

  onEdit(dados: Produto){
    this._parent.onEdit(dados);
  }

  onDelete(dados: Produto){
    this._parent.onDelete(dados);
  }
  
  changeLoaded(){
    this.dataLoaded = true;
  }

}
