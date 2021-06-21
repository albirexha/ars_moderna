import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddPostComponent} from "../add-post/add-post.component";

@Component({
  selector: 'app-admin-posts-list',
  templateUrl: './admin-posts-list.component.html',
  styleUrls: ['./admin-posts-list.component.css']
})
export class AdminPostsListComponent implements OnInit {

  constructor(
    private dialog : MatDialog

  ) { }

  ngOnInit(): void {
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddPostComponent, dialogConfig).afterClosed().toPromise();
  }
}
