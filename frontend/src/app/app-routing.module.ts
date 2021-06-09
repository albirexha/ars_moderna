import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {PostsListComponent} from "./posts/posts-list/posts-list.component";
import {MyPostsListComponent} from "./posts/my-posts/my-posts-list/my-posts-list.component";
import {SinglePostComponent} from "./posts/single-post/single-post.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'posts', component: PostsListComponent},
  {path: 'my_posts', component: MyPostsListComponent},
  {path: 'single-post/:id' ,component: SinglePostComponent},
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
