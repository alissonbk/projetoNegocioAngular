import { ClientesComponent } from './../clientes.component';
import { Component, OnInit, Input } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-mostrar-clientes',
  templateUrl: './mostrar-clientes.component.html',
  styleUrls: ['./mostrar-clientes.component.css']
})
export class MostrarClientesComponent implements OnInit {

  data: any;

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.loadClientes();

    // this.clienteService.emitirCliente.subscribe( cliente => console.log("emiiter", cliente));
    console.log("Mostrar data: ", this.data);
  }


  loadClientes(){
    this.clientesService.getClientes().subscribe((clientes:any) => {
      this.data = clientes;
      console.log("data= ",this.data);
    })
    
  }

}
