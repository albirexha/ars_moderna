import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {FavoriteService} from "../../services/favorite.service";

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {

  posts: any;
  error: String = "";
  post: any;
  p: number = 1;


  imgUrl: string = "http://localhost/ars_moderna/backend/storage/app/public/imgs/";

  constructor(
    private postService: PostsService,
    private favoriteService: FavoriteService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getUserPosts();
  }

  getUserPosts() {
    this.favoriteService.myFavorites()
      .toPromise().then((data: any) => {
      this.posts = data;
    }, (error) =>{
      if(error.status === 401)
        this.error = "Please login!";
      if(error.status ===404)
        this.posts = [];
      else
        this.error = error.error;
    });
  }

  removeFavorite(id: string){
    this.favoriteService.newFavorite(id).toPromise().then(data => {
      this.toastr.warning("Favorite removed!");
      this.getUserPosts();

    },error=>{
      this.toastr.error("Favorite deleting failed.");
      this.getUserPosts();
      console.log(error);
    });

  }
}
