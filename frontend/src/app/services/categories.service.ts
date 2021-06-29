import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly RootURL = environment.apiUrl + "/ars_moderna/backend/public/api"

  constructor(private http: HttpClient) { }

  addCategory(values:any){
    return this.http.post(this.RootURL+'/categories', values);
  }

  getCategories(){
    return this.http.get(this.RootURL+"/categories");
  }
}
