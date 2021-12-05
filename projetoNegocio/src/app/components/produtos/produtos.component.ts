import { Component, Host, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService
    ) { }

  ngOnInit(): void {
    this.produtos = this.formBuilder.group({
      id: [null],
      descricao: [null, Validators.required],
      marca: [null, Validators.required],
      preco: [null, [Validators.required]]
    })


    this.produtos.get('id')?.setValue(this.route.snapshot.queryParamMap.get('id'));
    this.produtos.get('descricao')?.setValue(this.route.snapshot.queryParamMap.get('descricao'));
    this.produtos.get('marca')?.setValue(this.route.snapshot.queryParamMap.get('marca'));
    this.produtos.get('preco')?.setValue(this.route.snapshot.queryParamMap.get('preco'));
  }


  onSubmit(){
    if(this.produtos.get('id')?.value !== null){
      this.produtosService.editarProduto(this.produtos.value);
    }else{
      this.produtosService.cadastrarProduto(this.produtos.value);
    }
    
    this.produtos.reset();
  }

  onEdit(dados: any){
    this.produtos.patchValue({
      "id": dados.id,
      "descricao": dados.descricao,
      "marca": dados.marca,
      "preco": dados.preco
    });
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir o produto ${dados.descricao}?`)){
      this.produtosService.excluirProduto(dados.id);
    }
  }
  

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/produtos/mostrar']);
    }else{
      this.router.navigate(['/produtos']);
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
