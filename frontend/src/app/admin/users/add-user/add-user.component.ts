import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<AddUserComponent>,

  ) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    // id: new FormControl),
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });

  onSubmit() {
    if (this.form.valid) {
      this.usersService.addUser(this.form.value).toPromise().then((data)=>{
          this.form.reset();
          this.dialogRef.close();
        });
    }
  }

}
