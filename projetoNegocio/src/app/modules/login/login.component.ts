import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { LoginService } from 'src/app/core/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login!: FormGroup;
  loading: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { }
  

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit(){
      this.loading = true;
      if (this.login.valid) {
        this.loginService.authenticate(this.login.value.email, this.login.value.password).subscribe(response => {
            this.router.navigate(['/home/']);
        }, (error) => {
            if (error.error.status === 403) {
                alert('E-mail e/ou senha incorreto(s).');
            } else {
                alert('Não foi possível comunicar com o servidor. Tente novamente');
            }
            this.loading = false;
        });
    } else {
        this.loading = false;
       alert('Formulário preenchido incorretamente.');
    }
  }

}
