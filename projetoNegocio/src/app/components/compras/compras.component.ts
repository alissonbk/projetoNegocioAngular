import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { ClientesService } from 'src/app/services/clientes.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  compras!: FormGroup;
  clientes: any;
  produtos: any;
  vendedores: any;
  hideBtn!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private comprasService: ComprasService,
    private clientesService: ClientesService,
    private produtosService: ProdutosService,
    private vendedoresService: VendedoresService
    ) { }

  ngOnInit(): void {
    this.compras = this.formBuilder.group({
      cliente: [null, Validators.required],
      produto: [null, Validators.required],
      vendedor: [null, Validators.required]
    })

    this.clientesService.getClientes().subscribe((clientes: any) =>{
      this.clientes = clientes;
    });
    this.produtosService.getProdutos().subscribe((produtos:any) => {
      this.produtos = produtos;
    })
    this.vendedoresService.getVendedores().subscribe((vendedores: any) => {
      this.vendedores = vendedores;
    })

  }


  onSubmit(){
    console.log("form compras:", this.compras);
    this.comprasService.setCompras(this.compras.value);
  }


  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.route.navigate(['/compras/mostrar']);
    }else{
      this.route.navigate(['/compras']);
    }
  }



  verificaValidTouched(campo: string){
    //return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
    return (
      !this.compras.get(campo)?.valid &&
      (this.compras.get(campo)?.touched || this.compras.get(campo)?.dirty)
      );
  }


  cssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

}
