import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(private router: Router){ }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
      // const loggedUser = JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('loggedUser'))));
      // if(loggedUser && loggedUser.tipo == "ADMIN"){
      //   return true;
      // }else if(loggedUser && loggedUser.tipo != "ADMIN"){
      //   alert("É necessário permissão de ADMIN para acessar esta página!");
      //   this.router.navigate(['/login']);
      //   return false;
      // }else{
      //   alert("É necessário login para acessar qualquer página!");
      //   this.router.navigate(['/login']);
      //   return false;
      // }
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    // const loggedUser = JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('loggedUser'))));
    //   if(loggedUser && loggedUser.tipo == "ADMIN"){
    //     return true;
    //   }else if(loggedUser && loggedUser.tipo != "ADMIN"){
    //     alert("É necessário permissão de ADMIN para acessar esta página!");
    //     this.router.navigate(['/login']);
    //     return false;
    //   }else{
    //     alert("É necessário login para acessar qualquer página!");
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
  }
  
}
