import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CategoriesService} from "../../../services/categories.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoriesService,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
  ) { }

  ngOnInit(): void {

  }

  form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  onSubmit() {
    if (this.form.valid) {
      this.categoryService.addCategory(this.form.value).toPromise().then((data)=>{
        this.form.reset();
        this.dialogRef.close();
      });
    }
  }

}
