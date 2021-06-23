import { Component, OnInit } from '@angular/core';
import {Auth} from "../classes/auth";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService

  ) { }

  isLogged: any;


  ngOnInit(): void {
    Auth.authEmitter.subscribe(
      (authenticated: boolean)=>{
        this.authenticated = authenticated;
      }
    )

    this.isLogged = this.authService.loggedIn();
  }

  logout(){
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('token');
        this.localStorageService.clear('role');
        // localStorage.removeItem('user_id');
        this.router.navigate(['/']);
      }
    );
  }
}
