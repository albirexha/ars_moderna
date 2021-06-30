import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostsService} from "../../services/posts.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {CategoriesService} from "../../services/categories.service";
import {UsersService} from "../../services/users.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private postService: PostsService,
    private toastr: ToastrService,
    private categoryService: CategoriesService,
    private userService: UsersService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getUser();
  }

  docs: any;
  categories: any = [];
  user_id: any;

  uploads(event:any) {
    this.docs = <File>event.target.files;
  }

  getCategories() {
    this.categoryService.getCategories().toPromise().then((data: any) => {
      this.categories = data.categories;
    })
  }

  getUser(){
    this.authService.authUser().toPromise().then((data:any)=>{
      this.user_id = data.id;
    })
  }

  onSubmit1(f: any){
    const formData = new FormData();
    for(var i =  0; i <  this.docs.length; i++)  {
      formData.append("images[]",  this.docs[i]);
    }

    formData.append('title', f.title);
    formData.append('user_id', this.user_id);
    formData.append('category_id',f.category_id);

    this.postService.createPost(formData).subscribe(data=>{
      this.toastr.success('Post created!');
    },error => {
      console.log(error);
      if(error.status == 401)
        this.toastr.error(error.error);
      else
        this.toastr.error("Some errors occured. Please try again.");
    })
  }
}
