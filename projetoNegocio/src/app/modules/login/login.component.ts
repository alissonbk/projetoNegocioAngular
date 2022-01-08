import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { LoginService } from 'src/app/core/services/login.service';
declare let alertify: any;

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
              alertify.dismissAll();
              alertify.set('notifier','delay', 3);
              alertify.set('notifier', 'position', 'top-center');
              alertify.error('E-mail e/ou senha incorreto(s).');
            } else {
                alertify.alert('Não foi possível comunicar-se com o servidor. Tente novamente mais tarde!');
            }
            this.loading = false;
        },
        () => {
          alertify.success("Login Efetuado Com Sucesso!");
        });
    } else {
      this.loading = false;
      alertify.dismissAll();
      alertify.set('notifier','delay', 3);
      alertify.set('notifier', 'position', 'top-center');
      alertify.error('Formulário preenchido incorretamente.');
    }
  }

}
