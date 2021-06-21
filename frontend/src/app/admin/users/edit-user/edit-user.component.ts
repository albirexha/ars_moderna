import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    public userService: UsersService,
    public dialogRef: MatDialogRef<EditUserComponent>,
  ) { }

  roles = [{"id" : 1, "name" : 'Admin'},{'id': 0, 'name': 'User'}];
  //artist = [{"id" : 1, "name" : 'True'},{'id': 0, 'name': 'False'}];

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.userService.editForm.valid) {
      this.userService.editUser(this.userService.editForm.value).toPromise().then((data:any)=>{
          this.userService.editForm.reset();
          this.dialogRef.close();
        },
        (err) => {
          this.dialogRef.close();
          console.log(err);
        });
    }
  }

}
