import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ClientesService } from 'src/app/core/services/clientes.service';
import { ComprasService } from 'src/app/core/services/compras.service';
import { ProdutosService } from 'src/app/core/services/produtos.service';
import { VendedoresService } from 'src/app/core/services/vendedores.service';
import { Cliente } from 'src/app/shared/models/cliente';
import { Compra } from 'src/app/shared/models/compra';
import { Produto } from 'src/app/shared/models/produto';
import { Vendedor } from 'src/app/shared/models/vendedor';
declare let alertify: any;

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  compras!: FormGroup;
  clientes!: Cliente[];
  produtos!: Produto[];
  vendedores!: Vendedor[];
  hideBtn!: boolean;
  paramId!: any;
  compraById!: any;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private comprasService: ComprasService,
    private clientesService: ClientesService,
    private produtosService: ProdutosService,
    private vendedoresService: VendedoresService,
    ) { }

  //Lifecyclehooks
  ngOnInit(): void {
    this.compras = this.formBuilder.group({
      id: [null],
      cliente: [null, Validators.required],
      produto: [null, Validators.required],
      vendedor: [null, Validators.required]
    })

    this.clientesService.getClientes().subscribe((clientes: Cliente[]) =>{
      this.clientes = clientes;
    });
    this.produtosService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
    this.vendedoresService.getVendedores().subscribe((vendedores: Vendedor[]) => {
      this.vendedores = vendedores;
    });

    //Path params
    this.paramId = this.route.snapshot.queryParamMap.get('id');
    if(this.paramId != null){
      this.getById(this.paramId);
    }
  }
  
  //Funções principais
  onSubmit(){
    let compra: Compra = new Compra(
      this.compras.get('cliente')?.value,
      this.compras.get('produto')?.value,
      this.compras.get('vendedor')?.value,
      this.compras.get('id')?.value
    );
    if(compra.id == null){
      compra.id = undefined;
      this.comprasService.cadastrarCompra(compra);
    }else{
      // //Caso o usuario não mude o campo, seleciona apenas o id.
      if(this.compras.get('vendedor')?.value.id){
        compra.vendedor = this.compras.get('vendedor')?.value.id;
      }
      if(this.compras.get('cliente')?.value.id){
        compra.cliente = this.compras.get('cliente')?.value.id;
      }
      if(this.compras.get('produto')?.value.id){
        compra.produto = this.compras.get('produto')?.value.id;
      }
      
      
      this.comprasService.editarCompra(compra);
    }
    this.compras.reset();
    this.reloadPage();
  }

  onEdit(dados: Compra){
    this.compras.patchValue({
      "id": dados.id,
      "cliente": dados.cliente,
      "produto": dados.produto,
      "vendedor": dados.vendedor
    });
    this.loading = false;
    window.scroll(0, -300);
  }

  onDelete(dados: Compra){
    alertify.confirm(`Você tem certeza que deseja excluir a compra ?`, () => {
      this.comprasService.excluirCompra(dados);
      this.reloadPage();
    });
  }

   //Utils...
  //getById temporario, antes da API
  getById(id: number){
    const pageable: any = {
      page: 0,
      size: 10
    }
    this.loading = true;
    this.comprasService.getCompras(pageable).subscribe((compras: any) => {
      for(let compra of compras){
        if(compra.id == id){
          this.onEdit(compra);
        }
      }
    });
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/compras/mostrar']);
  }

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/compras/mostrar']);
    }else{
      this.router.navigate(['/compras']);
    }
  }

  verificaValidTouched(campo: string){
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
