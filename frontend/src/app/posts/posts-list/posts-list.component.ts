import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: any;
  categories: any;
  p: number = 1;

  constructor(
    private postService: PostsService,
    private _router: Router,
    private categoryService: CategoriesService

  ){}

  ngOnInit(): void {
    this.getPosts();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().toPromise().then((data: any) => {
      this.categories = data.categories;
    });
  }

  getPosts(){
    this.postService.getPosts()
      .toPromise().then((data:any)=>{
        this.posts = data.posts;
    });
  }

  getPostsByCat(id:any){
    this.postService.posts_cat(id).toPromise().then((data: any)=>{
      this.posts = data.posts;
    })
  }
}
