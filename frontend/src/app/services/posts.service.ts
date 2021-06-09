import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  readonly RootURL = environment.apiUrl + "/ars_moderna/backend/public/api"
  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(this.RootURL+"/posts");
  }

  getUserPosts(){
    return this.http.get(this.RootURL+'/my_posts');
  }

  getPostById(id: String){
    return this.http.get(this.RootURL+'/post/'+id);
  }

}
