import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  constructor(private route: ActivatedRoute,  private postService: PostsService, private router: Router) {
    this.postData = {title: '', description: '', user: ''}
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.getPostById(params.id);
        }
      );
  }


  getPostById(id: any){
    this.postService.getPostById(id)
      .toPromise().then((data:any)=>{
      this.postData = data.post;

      },(error) =>{
        this.router.navigate(['404']);
      }
      )
  }

  postData: any;
}
