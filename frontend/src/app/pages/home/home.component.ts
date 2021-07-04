import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth} from "../../classes/auth";
import {AuthService} from "../../services/auth.service";
import {PostsService} from "../../services/posts.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddUserComponent} from "../../admin/users/add-user/add-user.component";
import {NewArtistComponent} from "../../posts/new-artist/new-artist.component";
import {map} from "rxjs/operators";
import {UsersService} from "../../services/users.service";
import {NewPostComponent} from "../../posts/new-post/new-post.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';
  posts: any;
  top_posts: any;
  imgUrl: string = "http://localhost/ars_moderna/backend/storage/app/public/imgs/";
  latest_artists: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private postsService: PostsService,
    private dialog : MatDialog,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.checkArtist();
    console.log(this.isArtist);
    this.authService.authUser()
      .subscribe(
        (user:any)=>{
          this.message = 'Hi '+ user.name;
          Auth.authEmitter.emit(true);
        },
        ()=>{
          this.message = 'Your are not logged in!';
          Auth.authEmitter.emit(false);
        }
      );

      this.postsService.getPosts().toPromise().then((data:any)=>{
        this.posts = data.posts;
      });

      this.postsService.getTopPosts().toPromise().then((data:any)=>{
        this.top_posts = data;
        console.log(data);
      })

      this.userService.getLatestArtists().toPromise().then((data:any)=>{
        this.latest_artists = data;
      });
  }


  new_artist(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.backdropClass = 'backdropBackground';

    this.dialog.open(NewArtistComponent, dialogConfig).beforeClosed().toPromise().then(result => {
      this.checkArtist();
    });
  }

  new_post(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.backdropClass = 'backdropBackground';

    this.dialog.open(NewPostComponent, dialogConfig).beforeClosed().toPromise().then(result => {
      this.checkArtist();
    });
  }

  isArtist: any = 1;

  async checkArtist() {
    var data: any = await this.authService.authUserArtist().toPromise();
    this.isArtist = data.isArtist;
  }

  isLogged(){
    return this.authService.loggedIn();
  }

}
