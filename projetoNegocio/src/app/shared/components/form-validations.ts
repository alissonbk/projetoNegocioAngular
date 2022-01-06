import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { cpf } from 'cpf-cnpj-validator'; 

export class FormValidations{

    static requiredMinCheckbox(min = 1): ValidatorFn {
        return (control: AbstractControl) =>{
            const controlArray = control as FormArray;
            if(controlArray.controls.map(v=>v.value).reduce((total, current) => current ? total + current : total, 0) >= min){
            return null;
            }else{
            return{
                requiredMinCheckbox: { valid: false }
            }
            }
        }
    }

    static cpfValidator(control: FormControl){
        let numeroCpf = control.value;
        if(numeroCpf && numeroCpf != ''){
            numeroCpf = numeroCpf.replace(/[^\d]/g, "");
            return cpf.isValid(numeroCpf) ? null : { cpfInvalido: true };
        }
        return null;
    }
    static cepValidator(control: FormControl) {
        let cep = control.value;
        if (cep && cep !== '') {
            cep = cep.replace(/[^\d]/g, "");
            const validacep = /^[0-9]{8}$/;
            return validacep.test(cep) ? null : { cepInvalido : true };
        }
        return null;
      }

    static equalsTo(otherField: string): ValidatorFn{
        
        return (control: AbstractControl) => {
            const controlForm = control as FormControl;
            const field = (<FormGroup>controlForm.root).get(otherField);
            if(controlForm.value !== '' && controlForm.value == field?.value){
                return null;
            }else{
                return {
                    equalsTo: { error: 'equalsTo'}
                }
            }
        }
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any){
        const config: any = {
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            'cpfInvalido': 'CPF inválido.',
            'cepInvalido': 'CEP inválido.',
            'emailInvalido': 'Email já cadastrado!',
            'equalsTo': 'Campos não são iguais',
            'pattern': 'Campo inválido',
            'email': `Email inválido.`,
            'emailEhValido': 'Email Valido!'
        };
        return config[validatorName];
    }
}