import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly RootURL = environment.apiUrl + '/ars_moderna/backend/public/api';
  constructor(private http: HttpClient) { }

  authUser(){
    return this.http.get(this.RootURL + "/authUser");
  }

  logout() {
    return this.http.post(this.RootURL + "/logout", {});
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  isAdmin(){
    this.http.get(this.RootURL + "/isAdmin").toPromise().then((data:any)=>{
      return true;
    }, (error)=>{
        return false;
    });
    return false;

  }

}
