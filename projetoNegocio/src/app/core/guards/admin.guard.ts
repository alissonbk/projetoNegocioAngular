import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(private router: Router, private notificationService: NotificationService){ }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const loggedUser = JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('loggedUser'))));
      if(loggedUser && loggedUser.tipo == "ADMIN"){
        return true;
      }else if(loggedUser && loggedUser.tipo != "ADMIN"){
        this.notificationService.showError("É necessário permissão de ADMIN para acessar esta página!");
        return false;
      }else{
        this.notificationService.showError("É necessário login para acessar esta página!");
        this.router.navigate(['/login']);
        return false;
      }
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedUser = JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('loggedUser'))));
      if(loggedUser && loggedUser.tipo == "ADMIN"){
        return true;
      }else if(loggedUser && loggedUser.tipo != "ADMIN"){
        this.notificationService.showErrorLonger("É necessário permissão de ADMIN para acessar esta página!");
        return false;
      }else{
        this.notificationService.showError("É necessário login para acessar esta página!");
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
