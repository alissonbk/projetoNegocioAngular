import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoBr } from 'src/app/models/estado-br';
import { DropdownService } from 'src/app/services/dropdown.service';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-pesquisa-vendedor',
  templateUrl: './pesquisa-vendedor.component.html',
  styleUrls: ['./pesquisa-vendedor.component.css']
})
export class PesquisaVendedorComponent implements OnInit {

  data: any;
  queryNome!: string;
  queryCPF!: string;
  queryEstado!: EstadoBr[];
  queryCidade!: string;

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


  loadVendedores(){
    this.vendedoresService.getVendedores().subscribe((vendedores: any) => {
      this.data = vendedores;
      console.log("data : ", this.data);
    })
  }

  onEdit(dados: any){
    // this.router.navigate(['../../clientes'], {queryParams: {id: dados.id} });
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

}
