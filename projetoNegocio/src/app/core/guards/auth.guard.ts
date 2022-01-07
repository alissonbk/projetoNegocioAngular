import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private loginService: LoginService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
      // const loggedUser = this.loginService.loggedUser;
      // if (!loggedUser) {
      //     if (state.url.endsWith('login')) {
      //         return true;
      //     }
      //     this.router.navigate(['login']);
      // } else {
      //     if (state.url.endsWith('login')) {
      //         this.router.navigate(['home']);
      //     }
      //     return true;
      // }
      // return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
  }
}
