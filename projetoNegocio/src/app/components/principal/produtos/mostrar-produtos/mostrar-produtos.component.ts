import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import { ProdutosComponent } from '../produtos.component';

@Component({
  selector: 'app-mostrar-produtos',
  templateUrl: './mostrar-produtos.component.html',
  styleUrls: ['./mostrar-produtos.component.css']
})
export class MostrarProdutosComponent implements OnInit {

  produtos$!: Observable<Produto[]>;
  error$ = new Subject<boolean>();

  constructor(
    private produtosService: ProdutosService,
    @Inject(forwardRef(() => ProdutosComponent)) private _parent: ProdutosComponent,
    private router: Router
    ) { 
    }

  ngOnInit(): void {
    this.loadProdutos();
    this._parent.hideBtn = true;
  }


  loadProdutos(){
    this.produtos$ = this.produtosService.getProdutos().pipe(
      catchError(error => {
        console.error(error);
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

}
