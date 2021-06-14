import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly RootURL = environment.apiUrl + "/ars_moderna/backend/public/api"
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.RootURL+"/users");
  }

  addUser(values:any){
    return this.http.post(this.RootURL+'/users', values);
  }

}
