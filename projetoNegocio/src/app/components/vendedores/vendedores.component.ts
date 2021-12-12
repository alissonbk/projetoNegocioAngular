import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EstadoBr } from 'src/app/models/estado-br';
import { CepService } from 'src/app/services/cep.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { FormValidations } from '../shared/form-validations';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {

  vendedores!: FormGroup;
  hideBtn!: boolean;
  todosEstados!: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vendedoresService: VendedoresService,
    private cepService: CepService,
    private dropdownService: DropdownService,
    private cf: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.hideBtn = false;
    this.vendedores = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: [null, [Validators.required, FormValidations.cpfValidator]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(4)]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    })

    //VIACEP
    this.vendedores.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      //tap(value => console.log(value)),
      switchMap(status => status === 'VALID' ? this.cepService.consultaCEP(this.vendedores.get('endereco.cep')?.value)
        : EMPTY)
      ).subscribe(dados => dados ? this.populaFormCep(dados) : { });

    //Estados
    this.dropdownService.getEstadosBr().subscribe((estados: any) => {
      this.todosEstados = estados;
    })

    //path param
    this.vendedores.get('id')?.setValue(this.route.snapshot.queryParamMap.get('id'));
    this.vendedores.get('nome')?.setValue(this.route.snapshot.queryParamMap.get('nome'));
    this.vendedores.get('email')?.setValue(this.route.snapshot.queryParamMap.get('email'));
    this.vendedores.get('cpf')?.setValue(this.route.snapshot.queryParamMap.get('cpf'));
    this.vendedores.get('endereco.cep')?.setValue(this.route.snapshot.queryParamMap.get('cep'));
    this.vendedores.get('endereco.numero')?.setValue(this.route.snapshot.queryParamMap.get('numero'));
    this.vendedores.get('endereco.rua')?.setValue(this.route.snapshot.queryParamMap.get('rua'));
    this.vendedores.get('endereco.bairro')?.setValue(this.route.snapshot.queryParamMap.get('bairro'));
    this.vendedores.get('endereco.cidade')?.setValue(this.route.snapshot.queryParamMap.get('cidade'));
    this.vendedores.get('endereco.estado')?.setValue(this.route.snapshot.queryParamMap.get('estado'));

    this.cf.detectChanges();
  }


  onSubmit(){
    if(this.vendedores.get('id')?.value != null){
      console.log('')
      this.vendedoresService.editarVendedor(this.vendedores.value).subscribe(
        next => {
          console.log(next);
        },
        error => {
          console.log(error)
        },
        () => {
          console.log("success");
          this.reloadPage();
        }
      );
    }else{
      this.vendedores.removeControl('id');
      this.vendedoresService.cadastrarVendedor(this.vendedores.value).subscribe(
        next => {
          console.log(next);
        },
        error => {
          console.log(error)
        },
        () => {
          console.log("success");
          this.reloadPage();
        }
      );
    }
    this.vendedores.reset();
  }

  onEdit(dados: any){
    this.vendedores.patchValue({
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
  }

  onDelete(dados: any){
    if(confirm(`Você tem certeza que deseja excluir o vendedor ${dados.nome}?`)){
      this.vendedoresService.excluirVendedor(dados.id).subscribe(
        next => {
          console.log(next);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log("success");
          this.reloadPage();
        }
      );
    }
  }

  reloadPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/vendedores/mostrar']);
  }



  // buttons e validação

  hideButton(){
    this.hideBtn = !this.hideBtn;
    if(this.hideBtn){
      this.router.navigate(['/vendedores/mostrar']);
    }else{
      this.router.navigate(['/vendedores']);
    }
    
  }

  verificaValidTouched(campo: string){
    //return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
    return (
      !this.vendedores.get(campo)?.valid &&
      (this.vendedores.get(campo)?.touched || this.vendedores.get(campo)?.dirty)
      );
  }


  cssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  populaFormCep(dados: any){
    this.vendedores.patchValue({
      "endereco": {
        "rua": dados.logradouro,
        "bairro": dados.bairro,
        "cidade": dados.localidade,
        "estado": dados.uf
      }
    });
  }

}
