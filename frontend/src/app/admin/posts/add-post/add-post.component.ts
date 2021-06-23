import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PostsService} from "../../../services/posts.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

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

  ) { }

  ngOnInit(): void {
  }

  docs: any;

  uploads(event:any) {
    this.docs = <File>event.target.files;
  }

  onSubmit1(f: any){
    const formData = new FormData();
    for(var i =  0; i <  this.docs.length; i++)  {
      formData.append("images[]",  this.docs[i]);
    }

    formData.append('title', f.title);
    formData.append('user_id', f.user_id);

    this.postService.createPost(formData).subscribe(data=>{
      this.dialogRef.close();
      this.toastr.success('Post created!');
    },error => {
      if(error.status == 401)
        this.toastr.error(error.error);
      else
        this.toastr.error("Some errors occured. Please try again.");
    })
  }

}
