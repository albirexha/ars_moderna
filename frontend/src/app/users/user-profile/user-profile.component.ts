import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordComponent} from "../change-password/change-password.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any;
  userName: any;

  constructor(
    public userService: UsersService,
    private toastr: ToastrService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  // Form
  changeDataForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    this.getAuthUser();
  }

  // Get the authenticated user
  getAuthUser(){
    this.authService.authUser().subscribe(
      (res) => {
        this.userData = res;
        this.changeDataForm.patchValue(this.userData);
      }
    );
  }

  onSubmit(){
    if (this.changeDataForm.valid) {
      this.userName = this.changeDataForm.controls["name"].value;
      this.userData.name = this.userName;
      this.userData.email = this.changeDataForm.controls["email"].value;
      this.userService.editProfile(this.changeDataForm.value).toPromise().then((data)=>{
          this.toastr.success('User is successfully edited!');
        },
        (err) => {
          this.toastr.error("Some errors occured. Please try again.");
          console.log(err);
        });
    }
  }

  // Change Password

  onChangePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    if(window.innerWidth < 550)
      dialogConfig.width = "70%";
    else
      dialogConfig.width = "30%";

    this.dialog.open(ChangePasswordComponent, dialogConfig).afterClosed().toPromise().then(result => {

    });
  }

}
