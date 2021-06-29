import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  deletePost(id: string){
    return this.http.delete(this.RootURL + '/posts/' + id);
  }

  createPost(values:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(this.RootURL+'/posts', values, {
      headers: headers
    });
  }

  likes_no(id: String){
    return this.http.get(this.RootURL+'/likes_no/'+id);
  }
}
