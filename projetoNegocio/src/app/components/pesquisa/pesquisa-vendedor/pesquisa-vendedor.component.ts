import { Component, OnInit } from '@angular/core';
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
    private dropDownService: DropdownService
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

}
