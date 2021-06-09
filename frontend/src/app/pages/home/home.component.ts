import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth} from "../../classes/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost/ars_moderna/backend/public/api/user')
      .subscribe(
        (user:any)=>{
          this.message = 'Hi '+ user.name;
          Auth.authEmitter.emit(true);
        },
        ()=>{
          this.message = 'Your are not logged in!';
          Auth.authEmitter.emit(false);

        }
      )
  }

}
