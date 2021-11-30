import { Component, OnInit } from '@angular/core';
import { EstadoBr } from 'src/app/models/estado-br';
import { DropdownService } from 'src/app/services/dropdown.service';
import { PesquisaService } from 'src/app/services/pesquisa.service';

@Component({
  selector: 'app-pesquisa-cliente',
  templateUrl: './pesquisa-cliente.component.html',
  styleUrls: ['./pesquisa-cliente.component.css']
})
export class PesquisaClienteComponent implements OnInit {

  data: any;
  clientes = [];
  queryNome!: string;
  queryCPF!: string;
  queryEstado!: EstadoBr[];
  queryCidade!: string;
  
  constructor(
    private pesquisaService: PesquisaService,
    private dropDownService: DropdownService
    ) {
    // para nunca ser undefined
    this.queryNome = "";
    this.queryCPF = "";
    this.queryCidade = "";
   }

  ngOnInit(): void {
    this.loadClientes();
    this.dropDownService.getEstadosBr().subscribe(dados => this.queryEstado = dados);
  }


  loadClientes(){
    this.pesquisaService.getClientes().subscribe((clientes:any) => {
      this.data = clientes;
      console.log("data= ",this.data);
      console.log("query nome:", this.queryNome);
    })
    
  }

}
