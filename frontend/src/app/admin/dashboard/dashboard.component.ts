import { Component, OnInit } from '@angular/core';
import {Auth} from "../../classes/auth";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authUser()
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
