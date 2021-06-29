import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import {LikesService} from "../../services/likes.service";
import {AuthService} from "../../services/auth.service";

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
              private authService: AuthService) {
    this.postData = {title: '', description: '', user: ''}
  }

  isLiked : boolean = false;
  postData: any;
  postId: any;
  likeCounter: any;
  postImages: any;
  sliderImages: Array<object> = [];

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.getPostById(params.id);
        this.postId = params.id;
        }
      );

    if(this.checkLoggedIn()){
      this.checkLike(this.postId);
    }
  }

  like(){
    this.likeCounter += (this.isLiked) ? -1 : 1;
    this.isLiked = !this.isLiked;
    this.likeService.likePost(this.postId)
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
      this.loadSlider();
      },(error) =>{
        this.router.navigate(['404']);
      }
      )
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

  checkLoggedIn(){
    return this.authService.loggedIn();
  }

  loadSlider(){
    var images: any[] = [];
    const imgLocation = 'http://localhost/ars_moderna/backend/storage/app/public/imgs/';

    this.postImages.forEach(function (testImage:any) {
      images.push(testImage.image);
    });

    images.forEach((image_ : any)=>{
      this.sliderImages.push({image: imgLocation+image_,thumbImage: 'https://hyaencdmit-flywheel.netdna-ssl.com/wp-content/uploads/TCG084VGLAAANN-AN00-300x200-1.jpg'});

    });
  }
}
