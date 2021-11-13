import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { }
  

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  onSubmit(){
    console.log(this.login);
    try{
      const result = this.loginService.login(this.login)
        console.log(`Login efetuado: ${result}`);
        this.router.navigate(['']);
    } catch(error){
      console.log(error);
    }
  }

}
