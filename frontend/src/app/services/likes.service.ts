import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  readonly RootURL = environment.apiUrl + "/ars_moderna/backend/public/api"

  constructor(private http: HttpClient) {
  }

  check_like(id: String) {
    return this.http.get(this.RootURL + '/check_like/' + id);
  }

  likePost(id: String) {
    return this.http.get(this.RootURL + '/new_like/' + id);
  }

}
