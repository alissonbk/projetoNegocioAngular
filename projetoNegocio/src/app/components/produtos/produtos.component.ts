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
      preco: [null, [Validators.required]]
    })
  }


  onSubmit(){
    // console.log(Object.assign({}, this.clientes.value));
    console.log("form:",this.produtos);
    this.produtosService.cadastrarProduto(this.produtos.value);
    this.produtos.reset();
  }

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.route.navigate(['/produtos/mostrar']);
    }else{
      this.route.navigate(['/produtos']);
    }
  }

  verificaValidTouched(campo: string){
    //return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
    return (
      !this.produtos.get(campo)?.valid &&
      (this.produtos.get(campo)?.touched || this.produtos.get(campo)?.dirty)
      );
  }


  cssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }


}
