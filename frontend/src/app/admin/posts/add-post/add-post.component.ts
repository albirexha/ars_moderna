import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PostsService} from "../../../services/posts.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {CategoriesService} from "../../../services/categories.service";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private postService: PostsService,
    public dialogRef: MatDialogRef<AddPostComponent>,
    private toastr: ToastrService,
    private categoryService: CategoriesService,
    private userService: UsersService,

  ) { }

  docs: any;
  categories: any = [];
  users: any = [];

  ngOnInit(): void {
    this.getCategories();
    this.getUsers();
  }

  uploads(event:any) {
    this.docs = <File>event.target.files;
  }

  getCategories(){
    this.categoryService.getCategories().toPromise().then((data:any)=>{
      this.categories = data.categories;
    })
  }

  getUsers(){
    this.userService.getUsers().toPromise().then((data:any)=>{
      this.users = data.users;
    })
  }

  onSubmit1(f: any){
    const formData = new FormData();
    for(var i =  0; i <  this.docs.length; i++)  {
      formData.append("images[]",  this.docs[i]);
    }

    formData.append('title', f.title);
    formData.append('user_id', f.user_id);
    formData.append('category_id',f.category_id);

    this.postService.createPost(formData).subscribe(data=>{
      this.dialogRef.close();
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
