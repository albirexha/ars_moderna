import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.css']
})
export class NewArtistComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<NewArtistComponent>,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    // id: new FormControl),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      this.usersService.addArtist(this.form.value).toPromise().then((data)=>{
        this.form.reset();
        this.dialogRef.close();
        this.localStorageService.store('isArtist',1);
      });
    }
  }

}
