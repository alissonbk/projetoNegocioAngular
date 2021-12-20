import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { EstadoBr } from 'src/app/models/estado-br';
import { ClientesService } from 'src/app/services/clientes.service';
import { DropdownService } from 'src/app/services/dropdown.service';

@Component({
  selector: 'app-pesquisa-cliente',
  templateUrl: './pesquisa-cliente.component.html',
  styleUrls: ['./pesquisa-cliente.component.css']
})
export class PesquisaClienteComponent implements OnInit {

  data: any;
  queryNome!: string;
  queryCPF!: string;
  queryEstado!: EstadoBr[];
  queryCidade!: string;
  
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
    this.dropDownService.getEstadosBr().subscribe(dados => this.queryEstado = dados);
  }


  loadClientes(){
    this.clientesService.getClientes().subscribe((clientes:any) => {
      this.data = clientes;
    })
  }

  onEdit(dados: any){
    this.router.navigate(['../../clientes'], {queryParams: {
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
    if(confirm(`Você tem certeza que deseja excluir o cliente ${dados.nome}?`)){
      this.clientesService.excluirCliente(dados.id);
    }
  }

}
