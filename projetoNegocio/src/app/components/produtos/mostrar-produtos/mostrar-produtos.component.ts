import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, isEmpty } from 'rxjs/operators';
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
    @Inject(forwardRef(() => ProdutosComponent)) private _parent: ProdutosComponent) { 
    }

  ngOnInit(): void {
    this.produtos$ = this.produtosService.getProdutos().pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return EMPTY;
      })
    );
    this._parent.hideBtn = true;
  }


  onEdit(dados: any){
    this._parent.onEdit(dados);
  }

  onDelete(dados: any){
    this._parent.onDelete(dados);
  }

}
