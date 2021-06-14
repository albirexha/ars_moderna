import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../../services/posts.service";

@Component({
  selector: 'app-my-posts-list',
  templateUrl: './my-posts-list.component.html',
  styleUrls: ['./my-posts-list.component.css']
})
export class MyPostsListComponent implements OnInit {

  posts: any;
  error: String = "";
  post: any;

  constructor(
    private postService: PostsService
  ) {
  }

  ngOnInit(): void {
    this.getUserPosts();
  }

  getUserPosts() {
    this.postService.getUserPosts()
      .toPromise().then((data: any) => {
        this.posts = data.posts;
    }, (error) =>{
        if(error.status === 401)
          this.error = "Please login!";
        else
          this.error = error.error;
    });
  }


}
