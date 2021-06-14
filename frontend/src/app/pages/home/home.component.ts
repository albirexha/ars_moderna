import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth} from "../../classes/auth";
import {AuthService} from "../../services/auth.service";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';
  posts: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private postsService: PostsService
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
      );

      this.postsService.getPosts().toPromise().then((data:any)=>{
        this.posts = data.posts;
      });
  }

}
