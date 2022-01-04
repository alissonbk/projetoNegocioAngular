import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { EstadoBr } from 'src/app/shared/models/estado-br';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pesquisa-cliente',
  templateUrl: './pesquisa-cliente.component.html',
  styleUrls: ['./pesquisa-cliente.component.css']
})
export class PesquisaClienteComponent implements OnInit {

  clientes$!: Observable<Cliente[]>;
  error$ = new Subject<boolean>();
  queryNome!: string;
  queryCPF!: string;
  queryEstado!: EstadoBr[];
  queryCidade!: string;
  dataLoaded!: boolean;
  firstExecution!: boolean;
  constructor(
    private clientesService: ClientesService,
    private dropDownService: DropdownService,
    private router: Router
    ) {
    this.queryNome = "";
    this.queryCPF = "";
    this.queryCidade = "";
   }

  ngOnInit(): void {
    this.loadClientes();
    this.dataLoaded = false;
    this.firstExecution = true;
    this.dropDownService.getEstadosBr().subscribe(dados => this.queryEstado = dados);
  }
  ngAfterViewChecked(): void {
    if(this.dataLoaded && this.firstExecution){
      window.scroll(0, 700);
      this.firstExecution = false;
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
    this.router.navigate(['../../clientes'], {queryParams: {id: dados.id}, skipLocationChange: true });
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir o cliente ${dados.nome}?`)){
      this.clientesService.excluirCliente(dados.id);
    }
  }

  changeLoaded(){
    this.dataLoaded = true;
  }

}
