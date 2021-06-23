import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../../services/users.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    public userService: UsersService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private toastr: ToastrService,
  ) { }

  roles = [{"id" : 1, "name" : 'Admin'},{'id': 0, 'name': 'User'}];
  //artist = [{"id" : 1, "name" : 'True'},{'id': 0, 'name': 'False'}];

  ngOnInit(): void {
//    this.toaster();
  }

  // toaster(){
  //   this.toastr.error('User is successfully edited!');
  // }

  onSubmit() {
    if (this.userService.editForm.valid) {
      this.userService.editUser(this.userService.editForm.value).toPromise().then((data:any)=>{
          this.toastr.success('User is successfully edited!');
          this.userService.editForm.reset();
          this.dialogRef.close();
        },
        (err) => {
        this.toastr.error('Some errors occured. Please try again.');
          this.dialogRef.close();
          console.log(err);
        });
    }
  }

}
