import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import {AddUserComponent} from "../add-user/add-user.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(
    private usersService : UsersService,
    private dialog : MatDialog
    ) {
    this.dataSource = new MatTableDataSource;
  }

  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[] = ['id','name','role','email','isArtist'];
  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers()
      .toPromise().then((data:any)=>{
      this.dataSource = new MatTableDataSource(data.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddUserComponent, dialogConfig).afterClosed().toPromise().then(result => {
      this.getUsers();
    });
  }

}
