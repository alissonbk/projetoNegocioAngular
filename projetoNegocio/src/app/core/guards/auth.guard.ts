import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification.service';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private loginService: LoginService, private notificationService: NotificationService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const loggedUser = this.loginService.loggedUser;
      if(loggedUser && !this.loginService.tokenExpired()){
        return true;
      }else if(loggedUser && this.loginService.tokenExpired()){
        this.notificationService.showError('Token Expirado!!');
        this.loginService.loggout();
        return false;
      }else{
        this.notificationService.showError('Login Necessário!');
        this.router.navigate(['login']);
        return false;
      }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
  }
}
