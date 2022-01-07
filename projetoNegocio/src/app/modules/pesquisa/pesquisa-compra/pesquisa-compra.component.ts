import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { ComprasService } from 'src/app/core/services/compras.service';
import { Compra } from 'src/app/shared/models/compra';

@Component({
  selector: 'app-pesquisa-compra',
  templateUrl: './pesquisa-compra.component.html',
  styleUrls: ['./pesquisa-compra.component.css']
})
export class PesquisaCompraComponent implements OnInit {

  compras$!: Observable<Compra[]>;
  error$ = new Subject<boolean>();
  queryCliente!: string;
  queryVendedor!: string;
  queryProduto!: string;
  dataLoaded!: boolean;
  firstExecution!: boolean;
  constructor(
    private comprasService: ComprasService,
    private router: Router
    ) { }

  //Lifecyclehooks
  ngOnInit(): void {
    this.loadCompras();
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
  loadCompras(){
    const pageable: any = {
      page: 0,
      size: 10
    }
   this.compras$ = this.comprasService.getCompras(pageable).pipe(
     catchError(error => {
       console.log(error);
       this.error$.next(true);
       return EMPTY;
     })
   );
  }

  onEdit(dados: any){
    this.router.navigate(['../../compras'], {queryParams: {id: dados.id}, skipLocationChange: true });
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir a compra (cliente: ${dados.cliente.nome} produto:${dados.produto.descricao})?`)){
      this.comprasService.excluirCompra(dados.id);
    }
  }

  changeLoaded(){
    this.dataLoaded = true;
  }

}
