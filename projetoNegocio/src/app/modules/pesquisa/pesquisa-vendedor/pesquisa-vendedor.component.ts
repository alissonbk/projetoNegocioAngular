import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { EstadoBr } from 'src/app/shared/models/estado-br';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { VendedoresService } from 'src/app/core/services/vendedores.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Vendedor } from 'src/app/shared/models/vendedor';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pesquisa-vendedor',
  templateUrl: './pesquisa-vendedor.component.html',
  styleUrls: ['./pesquisa-vendedor.component.css']
})
export class PesquisaVendedorComponent implements OnInit {

  vendedores$!: Observable<Vendedor[]>;
  error$ = new Subject<boolean>();
  queryNome!: string;
  queryCPF!: string;
  queryEstado!: EstadoBr[];
  queryCidade!: string;
  dataLoaded: boolean = false;

  constructor(
    private vendedoresService: VendedoresService,
    private dropDownService: DropdownService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadVendedores();
    this.dropDownService.getEstadosBr().subscribe((estados: any) => {
      this.queryEstado = estados;
    })
  }
  ngAfterViewChecked(){
    if(this.dataLoaded){
      window.scroll(0, 400);
    }
  }


  loadVendedores(){
    this.vendedores$ = this.vendedoresService.getVendedores().pipe(
      catchError(error => {
        console.log(error);
        this.error$.next(true);
        return EMPTY;
      })
    );
  }

  onEdit(dados: any){
    this.router.navigate(['../../vendedores'], {queryParams: {
      id: dados.id,
      nome: dados.nome,
      email: dados.email,
      cpf: dados.cpf,
      cep: dados.endereco.cep,
      numero: dados.endereco.numero,
      rua: dados.endereco.rua,
      bairro: dados.endereco.bairro,
      cidade: dados.endereco.cidade,
      estado: dados.endereco.estado
    }, skipLocationChange: true 
    });
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir o vendedor ${dados.nome}?`)){
      this.vendedoresService.excluirVendedor(dados.id);
    }
  }

  changeLoaded(){
    this.dataLoaded = true;
  }

}
