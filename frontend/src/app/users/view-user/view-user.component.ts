import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {PostsService} from "../../services/posts.service";

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
    private postService: PostsService,
  ) { }

  user: any;
  posts: any;
  imgUrl: string = "http://localhost/ars_moderna/backend/storage/app/public/imgs/";


  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
          this.getUserById(params.id);
          this.getLatestPosts(params.id);
        }
      );
  }

  getUserById(id: any){
    this.userService.getArtistById(id)
      .toPromise().then((data:any)=>{
        console.log(data);
        this.user = data;
    },(error) =>{
      this.router.navigate(['404']);
    })
  }

  getLatestPosts(id: String){

    this.postService.getLatestUserPosts(id).toPromise()
      .then((data:any)=>{
        console.log(data);
        this.posts = data;
      })
  }

}
