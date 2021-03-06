import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { ProdutosService } from 'src/app/core/services/produtos.service';
import { Produto } from 'src/app/shared/models/produto';
declare let alertify: any;


@Component({
  selector: 'app-pesquisa-produto',
  templateUrl: './pesquisa-produto.component.html',
  styleUrls: ['./pesquisa-produto.component.css']
})
export class PesquisaProdutoComponent implements OnInit {

  produtos$!: Observable<Produto[]>;
  error$ = new Subject<boolean>();
  queryDesc!: string;
  queryMarca!: string;
  queryValor!: number;
  dataLoaded!: boolean;
  firstExecution!: boolean;
  constructor(
    private produtosService: ProdutosService,
    private router: Router
    ) { }

  //Lifecyclehooks
  ngOnInit(): void {
    this.loadProdutos();
    this.dataLoaded = false;
    this.firstExecution = true;
  }

  ngAfterViewChecked(){
    if(this.dataLoaded && this.firstExecution){
      window.scroll(0, 700);
      this.firstExecution = false;
    }
  }

  //Functions
  loadProdutos(){
    this.produtos$ = this.produtosService.getProdutos(this.queryDesc, this.queryMarca).pipe(
      catchError(error => {
        console.log(error);
        this.error$.next(true);
        return EMPTY;
      })
    );
  }

  onEdit(dados: any){
    this.router.navigate(['../../produtos'], {queryParams: {id: dados.id}, skipLocationChange: true });
  }

  onDelete(dados: any){
    alertify.confirm(`Você tem certeza que deseja excluir o produto ${dados.descricao}?`, () => {
      this.produtosService.excluirProduto(dados);
    });
      
    
  }
  
  changeLoaded(){
    this.dataLoaded = true;
  }

}
