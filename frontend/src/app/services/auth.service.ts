import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  readonly RootURL = environment.apiUrl + '/ars_moderna/backend/public/api';
  constructor(private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.userRole();
  // }
  //
  // role: any;

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
    return this.http.get(this.RootURL + "/isAdmin");
  }

  authUserArtist(){
    return this.http.get(this.RootURL + "/authUser");
  }

  changePassword(values:any){
    return this.http.post(this.RootURL + "/user/change-password", values);
  }

}
