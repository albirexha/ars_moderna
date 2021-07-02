import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
  ) { }

  user: any;

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
          this.getUserById(params.id);
        }
      );
  }

  getUserById(id: any){
    this.userService.getUserById(id)
      .toPromise().then((data:any)=>{
        console.log(data);
        this.user = data.user;
    },(error) =>{
      this.router.navigate(['404']);
    })
  }

}
