import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {CategoriesService} from "../../../services/categories.service";
import {MatPaginator} from "@angular/material/paginator";
import {AddUserComponent} from "../../users/add-user/add-user.component";
import {AddCategoryComponent} from "../add-category/add-category.component";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  constructor(
    private categoryService : CategoriesService,
    private dialog : MatDialog,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource;
  }

  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[] = ['id','name','Actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories()
      .toPromise().then((data:any)=>{
        console.log(data);
      this.dataSource = new MatTableDataSource(data.categories);
      this.dataSource.paginator = this.paginator;
    });
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddCategoryComponent, dialogConfig).afterClosed().toPromise().then(result => {
      this.getCategories();
    });
  }

  onDelete(id: string){

  }

  onEdit(row: any){

  }

}
