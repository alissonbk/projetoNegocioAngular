import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos!: FormGroup;
  hideBtn!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.produtos = this.formBuilder.group({
      descricao: [null, Validators.required],
      marca: [null, Validators.required],
      preco: [null, [Validators.required, Validators.email]]
    })
  }


  onSubmit(){
    // console.log(Object.assign({}, this.clientes.value));
    console.log("form:",this.produtos);
    this.produtosService.setProdutos(this.produtos.value);
  }

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.route.navigate(['/produtos/mostrar']);
    }else{
      this.route.navigate(['/produtos']);
    }
    
  }

}
