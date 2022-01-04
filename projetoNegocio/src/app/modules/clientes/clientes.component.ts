import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';


import { EstadoBr } from 'src/app/shared/models/estado-br';
import { CepService } from 'src/app/core/services/cep.service';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { FormValidations } from '../../shared/components/form-validations';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes!: FormGroup;
  hideBtn!: boolean;
  todosEstados!: EstadoBr[];
  paramId!: any;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private cepService: CepService,
    private dropdownService: DropdownService
    ) { }

  ngOnInit(): void {
    // FORMULARIO
    this.clientes = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      cpf: [null, [Validators.required, FormValidations.cpfValidator] ],
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
      ).subscribe(dados => dados ? this.populaFormCep(dados) : { });

    //Estados
    this.dropdownService.getEstadosBr().subscribe((estado: any) =>{
      this.todosEstados = estado;
    })
    //Path param
    this.paramId = this.route.snapshot.queryParamMap.get('id');
    if(this.paramId != null){
      this.getById(this.paramId);
    }
    
  }
  ngAfterViewInit(): void {
    window.scroll(0, -300);
  }


  onSubmit(){
    if(this.clientes.get('id')?.value == null){
      this.clientesService.cadastrarCliente(this.clientes.value);
    }else{
      this.clientesService.editarCliente(this.clientes.value);
    }
    
    this.clientes.reset();
  }

  onEdit(dados: any){
    this.clientes.patchValue({
      "id": dados.id,
      "nome": dados.nome,
      "cpf": dados.cpf,
      "email": dados.email,
      "endereco": {
        "cep": dados.endereco.cep,
        "numero": dados.endereco.numero,
        "rua": dados.endereco.rua,
        "bairro": dados.endereco.bairro,
        "cidade": dados.endereco.cidade,
        "estado": dados.endereco.estado
    }
    });
    this.loading = false;
    window.scroll(0, -300);
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir o cliente ${dados.nome}?`)){
      this.clientesService.excluirCliente(dados.id);
    }
  }

  getById(id: number){
    this.loading = true;
    this.clientesService.getClientes().subscribe((clientes: any) => {
      for(let cliente of clientes){
        if(cliente.id == id){
          this.onEdit(cliente);
        }
      }
    })
  }



  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/clientes/mostrar']);
    }else{
      this.router.navigate(['/clientes']);
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


  populaFormCep(dados: any){
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
