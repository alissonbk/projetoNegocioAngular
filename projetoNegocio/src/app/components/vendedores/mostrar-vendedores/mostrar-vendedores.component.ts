import { Component, OnInit } from '@angular/core';
import { Vendedor } from 'src/app/models/vendedor';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-mostrar-vendedores',
  templateUrl: './mostrar-vendedores.component.html',
  styleUrls: ['./mostrar-vendedores.component.css']
})
export class MostrarVendedoresComponent implements OnInit {

  data: any;

  constructor(private vendedoresService: VendedoresService) { }

  ngOnInit(): void {
    this.loadVendedores();
  }

  loadVendedores(){
    this.vendedoresService.getVendedores().subscribe((vendedores: any) => {
      this.data = vendedores;
      console.log("data= ",this.data);
    })

    
  }

}
