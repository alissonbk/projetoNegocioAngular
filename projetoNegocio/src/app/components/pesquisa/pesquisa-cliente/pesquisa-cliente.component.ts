import { Component, OnInit } from '@angular/core';
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
    private clienteService: ClientesService,
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
    this.clienteService.getClientes().subscribe((clientes:any) => {
      this.data = clientes;
      console.log("data= ",this.data);
      console.log("query nome:", this.queryNome);
    })
    
  }

}
