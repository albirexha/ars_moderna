import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  editUser(values: any){
    return this.http.put(this.RootURL + "/user/" + values.id, values);
  }

  deleteUser(id: string){
    return this.http.delete(this.RootURL + '/users/' + id);
  }

  addArtist(values: any){
    return this.http.post(this.RootURL+'/new_artist', values);
  }

  getUserById(id: string){
    return this.http.get(this.RootURL + '/user/' + id);
  }

  editProfile(values: any){
    return this.http.put(this.RootURL + "/edit_profile/"+ values.id, values);
  }

  getLatestArtists(){
    return this.http.get(this.RootURL + '/latest_artists');
  }

  getArtistById(id: string){
    return this.http.get(this.RootURL + '/artist_by_id/' + id);
  }

  editForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required),
    isArtist: new FormControl('', Validators.required),
  });
}
