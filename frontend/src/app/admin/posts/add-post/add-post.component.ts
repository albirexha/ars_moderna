import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
//import Swal from 'sweetalert2/dist/sweetalert2.js';
import {PostsService} from "../../../services/posts.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private postService: PostsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPostComponent>,

  ) { }

  ngOnInit(): void {
  }


  /* file upload */
  /* Variabe to store file data */
  filedata:any;
  /* File onchange event */
  fileEvent(e:any){
    this.filedata = e.target.files[0];
  }

  /* Upload button functioanlity */
  onSubmitform(f: NgForm) {

    var myFormData = new FormData();
    myFormData.append('image', this.filedata);
    /* Image Post Request */

  }
  /* file upload */

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    user_id: new FormControl(''),
  });

  onSubmit() {
    if (this.form.valid) {

      // this.form.patchValue({
      //   image: this.filedata
      // })


      // this.postService.createPost(this.form.value).subscribe(data=>{
      //   console.log(data);
      //   // Swal.fire({
      //   //   title: 'Hurray!!',
      //   //   text:   'asd',
      //   //   icon: 'success'
      //   // });
      // });


    }
  }

  onSubmit1(f: any){
    var myFormData = new FormData();
    const headers = new HttpHeaders();


    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('image', this.filedata);
    myFormData.append('title', f.title);
    myFormData.append('user_id', f.user_id);
    console.log(f.user_id);

    this.postService.createPost(myFormData).subscribe(data=>{
      console.log(data);
      this.form.reset();
      this.dialogRef.close();
    })

  }

}
