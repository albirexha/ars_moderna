import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import {LikesService} from "../../services/likes.service";
import {AuthService} from "../../services/auth.service";
import {FavoriteService} from "../../services/favorite.service";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private postService: PostsService,
              private router: Router,
              private likeService: LikesService,
              private favoriteService: FavoriteService,
              private authService: AuthService) {
    this.postData = {title: '', description: '', user: '', artist:{first_name: '', last_name: ''}, category:{category_name: ''}}
  }

  isLiked : boolean = false;
  isFavorite : boolean = false;
  postData: any;
  postId: any;
  postCategory:any;
  likeCounter: any;
  postImages: any;
  sliderImages: Array<object> = [];
  imageSize = {width: '50%', height: 400};
  similarPosts: any;
  imgUrl: string = "http://localhost/ars_moderna/backend/storage/app/public/imgs/";

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.getPostById(params.id);
        this.postId = params.id;
        }
      );

    if(this.checkLoggedIn()){
      this.checkLike(this.postId);
      this.checkFavorite(this.postId);
    }
  }

  like(){
    this.likeCounter += (this.isLiked) ? -1 : 1;
    this.isLiked = !this.isLiked;
    this.likeService.likePost(this.postId)
      .toPromise().then((data:any)=>{
    },(error)=>{
        console.log(error);
    });
  }

  newFavorite(){
    this.isFavorite = !this.isFavorite;
    this.favoriteService.newFavorite(this.postId)
      .toPromise().then((data:any)=>{
        console.log(data);
    },(error)=>{
      console.log(error);
    });
  }

  getPostById(id: any){
    this.postService.getPostById(id)
      .toPromise().then((data:any)=>{
      this.postData = data.post;
      this.likeCounter = data.post.total_likes;
      this.postImages = data.post.images;
      this.postCategory = data.post.category.id;
      this.loadSlider();
      this.getSimilarPosts();

    });

  }

  checkLike(id: any){
    this.likeService.check_like(id).toPromise().then((data:any) =>{
      if(data == 'Liked')
        this.isLiked = true;
    },(error)=>{
      console.log(error);
      // this.router.navigate(['404']);
    });
  }

  checkFavorite(id: any){
    this.favoriteService.check_favorite(id).toPromise().then((data:any) =>{
      if(data == 'Favorite!') {
        this.isFavorite = true;
        console.log(this.isFavorite);
      }
    },(error)=>{
      console.log(error);
      // this.router.navigate(['404']);
    });
  }

  checkLoggedIn(){
    return this.authService.loggedIn();
  }

  loadSlider(){
    var images: any[] = [];
    const imgLocation = 'http://localhost/ars_moderna/backend/storage/app/public/imgs/';

    this.postImages.forEach(function (testImage:any) {
      images.push(testImage.image);
    });

    if(images.length<2){
      this.imageSize = {width: '100%', height: 400};
    }

    images.forEach((image_ : any)=>{
      this.sliderImages.push({image: imgLocation+image_,thumbImage: imgLocation+image_});
    });
  }

  getSimilarPosts() {
    this.postService.getSimilarPosts(this.postCategory)
      .toPromise().then((data: any) => {
      this.similarPosts = data;
    });
  }
}
