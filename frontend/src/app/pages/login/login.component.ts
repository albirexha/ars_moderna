import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup | any ;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router:Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
      //password_confirm: '',
    })
  }

  submit(): void{
    this.http.post('http://localhost/ars_moderna/backend/public/api/login', this.form?.getRawValue())
      .subscribe((data: any)=> {
        this.token = data;
        localStorage.setItem('token', this.token.jwt);
        this.authService.authUser().subscribe((next: any) => {
          if (next.role == 1) {
            this.router.navigate(['dashboard'])
          } else {
            this.router.navigate(['/'])
          }
        })
      })
  }
}
