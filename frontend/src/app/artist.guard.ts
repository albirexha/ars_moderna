import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./services/auth.service";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class ArtistGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
  }

  canActivate(): boolean {

    if(this.localStorageService.retrieve('isArtist') && this.localStorageService.retrieve('isArtist') == 1)
      {
        return true;
      }
    else
      {
        this.router.navigate(['new_artist']);
        return false;
      }
  }

}
