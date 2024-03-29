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
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {UsersListComponent} from "./admin/users/users-list/users-list.component";
import {AuthGuard} from "./auth.guard";
import {AdminGuard} from "./admin.guard";
import {AdminPostsListComponent} from "./admin/posts/admin-posts-list/admin-posts-list.component";
import {CategoriesListComponent} from "./admin/categories/categories-list/categories-list.component";
import {NewArtistComponent} from "./posts/new-artist/new-artist.component";
import {NewPostComponent} from "./posts/new-post/new-post.component";
import {UserProfileComponent} from "./users/user-profile/user-profile.component";
import {ViewUserComponent} from "./users/view-user/view-user.component";
import {FavoritesListComponent} from "./favorites/favorites-list/favorites-list.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'posts', component: PostsListComponent},
  {path: 'my_posts', component: MyPostsListComponent},
  {path: 'my_favorites', component: FavoritesListComponent},
  {path: 'single-post/:id' ,component: SinglePostComponent},
  {path: 'new_artist' ,component: NewArtistComponent},
  {path: 'my_profile' ,component: UserProfileComponent},
  {path: 'user/:id' ,component: ViewUserComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard],
    children:[
      //{ path: '', component: HomeComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'admin-posts', component: AdminPostsListComponent },
      { path: 'categories', component: CategoriesListComponent },
    ]
  },

  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
