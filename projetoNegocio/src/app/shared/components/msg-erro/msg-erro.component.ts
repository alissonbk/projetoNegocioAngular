import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-msg-erro',
  templateUrl: './msg-erro.component.html',
  styleUrls: ['./msg-erro.component.css']
})
export class MsgErroComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() label!: string; 

  constructor() { }

  ngOnInit(): void {
    this.errorMessage;
  }

  get errorMessage(){
    for(const propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
