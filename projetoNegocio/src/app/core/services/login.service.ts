import { HttpClient } from '@angular/common/http';
import { Vendedor } from './../../shared/models/vendedor';
import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/core/services/abstract.service';
import { tap } from 'rxjs/operators';
import { ResponseDTO } from 'src/app/shared/models/responseDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AbstractService {

  private readonly STORAGE_KEY = 'loggedUser';

  constructor(http: HttpClient, private router: Router) {
    super(http)
  }

  authenticate(email: string, senha: string){
    const credenciais = {email: email, senha: senha};
    console.log(credenciais);
    return this.http.post<Vendedor>(`${this.API_URL}/v1/login`, credenciais)
        .pipe(
            tap(autenticado => {
                if (LoginService.checkLogged(autenticado)) {
                    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(autenticado));
                } else {
                    alert('Não permitido!');
                }
            })
        );
  }

  private static checkLogged(u: Vendedor | ResponseDTO<void>): u is Vendedor {
    return (u as Vendedor).access_token !== undefined;
  }

  loggout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.redirectLogin();
  }

  redirectLogin(): void {
      this.router.navigate(['']);
  }

  get loggedUser(): Vendedor | null {
      return JSON.parse(sessionStorage.getItem(this.STORAGE_KEY) as string);
  }


  setLoggedUser(usuario: Vendedor): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
  }


}
