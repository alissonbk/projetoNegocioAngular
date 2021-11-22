import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes!: FormGroup;
  hideBtn!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router) { }

  ngOnInit(): void {
    this.clientes = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })

    })
  }


  onSubmit(){
    // console.log(Object.assign({}, this.clientes.value));
    console.log("form:",this.clientes.value);
  }

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.route.navigate(['/clientes/mostrar']);
    }else{
      this.route.navigate(['/clientes']);
    }
    
  }

}
