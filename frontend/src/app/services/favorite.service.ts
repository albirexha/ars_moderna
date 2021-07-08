import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {


  readonly RootURL = environment.apiUrl + "/ars_moderna/backend/public/api"

  constructor(private http: HttpClient) {
  }

  check_favorite(id: String) {
    return this.http.get(this.RootURL + '/check_favorite/' + id);
  }

  newFavorite(id: String) {
    return this.http.get(this.RootURL + '/new_favorite/' + id);
  }

  myFavorites(){
    return this.http.get(this.RootURL + '/my_favorites');
  }

}
