import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './services/auth.service';
import {take} from "rxjs/operators";
import {LocalStorageService} from "ngx-webstorage";
import {reflectTypeEntityToDeclaration} from "@angular/compiler-cli/src/ngtsc/reflection";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
  }

  //role: any;

  canActivate(): boolean {

    if(this.localStorageService.retrieve('role') && this.localStorageService.retrieve('role') == 1){
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
      }
    }

    // var role = this.authService.userRole();
    //
    // console.log(this.authService.userRole());
    //
    // // this.authService.authUser().toPromise().then((data: any) => {
    // //   // console.log(data);
    // //   this.role = data.role;
    // //   console.log(this.role);
    // // });
    //
    // console.log(role);
    //
    // if (role == 1) {
    //   // console.log(data.role);
    //   //this.router.navigate(['dashboard']);
    //   return true;
    // }else {
    //   this.router.navigate(['']);
    //   return false;
    // }
  //}
}

