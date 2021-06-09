import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup | any ;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router:Router
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
      .subscribe(()=>this.router.navigate(['/']))
  }

}
