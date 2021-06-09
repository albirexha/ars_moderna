import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: any;

  constructor(
    private postService: PostsService,
    private _router: Router

  ){}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts()
      .toPromise().then((data:any)=>{
        this.posts = data.posts;

    });
  }

}
