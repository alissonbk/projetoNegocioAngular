import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { CepService } from 'src/app/services/cep.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { FormValidations } from '../shared/form-validations';

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
    private route: Router,
    private clientesService: ClientesService,
    private cepService: CepService) { }

  ngOnInit(): void {
    // FORMULARIO
    this.clientes = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      cpf: [null, [Validators.required, FormValidations.cpfValidator]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });
    //VIACEP
    this.clientes.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      //tap(value => console.log(value)),
      switchMap(status => status === 'VALID' ? this.cepService.consultaCEP(this.clientes.get('endereco.cep')?.value)
        : EMPTY)
      ).subscribe(dados => dados ? this.populaForm(dados) : { });

  }


  onSubmit(){
    // console.log(Object.assign({}, this.clientes.value));
    console.log("form:",this.clientes);
    this.clientesService.setClientes(this.clientes.value);
  }

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.route.navigate(['/clientes/mostrar']);
    }else{
      this.route.navigate(['/clientes']);
    }
    
  }

  // VALIDATION FUNCTIONS

  verificaValidTouched(campo: string){
    //return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
    return (
      !this.clientes.get(campo)?.valid &&
      (this.clientes.get(campo)?.touched || this.clientes.get(campo)?.dirty)
      );
  }


  cssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }


  populaForm(dados: any){
    this.clientes.patchValue({
      "endereco": {
        "rua": dados.logradouro,
        "bairro": dados.bairro,
        "cidade": dados.localidade,
        "estado": dados.uf
      }
    });
  }

}
