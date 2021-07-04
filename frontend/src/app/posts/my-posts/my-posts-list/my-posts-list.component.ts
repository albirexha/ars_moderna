import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../../services/posts.service";
import Swal from "sweetalert2";
import {UsersService} from "../../../services/users.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-posts-list',
  templateUrl: './my-posts-list.component.html',
  styleUrls: ['./my-posts-list.component.css']
})
export class MyPostsListComponent implements OnInit {

  posts: any;
  error: String = "";
  post: any;

  imgUrl: string = "http://localhost/ars_moderna/backend/storage/app/public/imgs/";

  constructor(
    private postService: PostsService,
    private toastr: ToastrService
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
        if(error.status ===404)
          this.posts = [];
        else
          this.error = error.error;
    });
  }

  onDelete(id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think.'
    })
      .then((willDelete: any) => {
        if (willDelete.value) {
          this.postService.deletePost(id).toPromise().then(data => {
            this.toastr.error("Post is successfully deleted!");
            this.getUserPosts();
          },error=>{
            this.toastr.error("Post deleting failed.");
            this.getUserPosts();
            console.log(error);
          });
        }
      });
  }

}
