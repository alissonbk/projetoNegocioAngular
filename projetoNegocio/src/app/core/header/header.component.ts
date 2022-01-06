import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  logged!: boolean;

  ngOnInit(): void {
    this.loginService.loggedUser != null ? this.logged = true : this.logged = false;
  }

  ngAfterContentChecked(): void {
    this.loginService.loggedUser != null ? this.logged = true : this.logged = false;
    
  }
  
  logout(){
    this.logged = false;
    this.loginService.loggout();
    this.router.navigate(['/login']);
  }


}
