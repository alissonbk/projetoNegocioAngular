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
  dataLoaded: boolean = false;

  constructor(
    private comprasService: ComprasService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadCompras();
  }
  ngAfterViewChecked(){
    if(this.dataLoaded){
      window.scroll(0, 700);
    }
  }

  loadCompras(){
   this.compras$ = this.comprasService.getCompras().pipe(
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
