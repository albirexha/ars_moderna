import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }

  userId: any = '';
  userRole: any = '';
  userName: any = '';
  ngOnInit(): void {
    this.authService.authUser().subscribe(
      (user:any)=>{
        this.userId = user.id;
        this.userRole = user.role;
        this.userName = user.name;
        console.log(this.userRole);
      }
    )
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
