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

  async canActivate(): Promise<boolean> {
    var userRolee = await this.getUserRole();
    if (userRolee == 1) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

  async getUserRole(){
    var data:any = await this.authService.authUserArtist().toPromise();
    return data.role;
  }

}

