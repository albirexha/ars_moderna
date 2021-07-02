import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }

  // Form
  form: FormGroup = new FormGroup({
    current_password: new FormControl('', Validators.required),
    new_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm_password: new FormControl('', [Validators.required])})

  // After form submition
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.changePassword(this.form.value).toPromise().then((data)=>{
          var stringifiedData = JSON.stringify(data);
          this.toastr.success(stringifiedData);
          this.form.reset();
          this.dialogRef.close();
        },
        (err) => {
          this.toastr.error(err.error);
          console.log(err);
        });
    }
  }


  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }

  // getting the form control elements
  get password(): AbstractControl {
    return this.form.controls['new_password'];
  }

  get confirm_password(): AbstractControl {
    return this.form.controls['confirm_password'];
  }

}
