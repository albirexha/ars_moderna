import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { MyPostsListComponent } from './posts/my-posts/my-posts-list/my-posts-list.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './admin/layouts/footer/footer.component';
import { HeaderComponent } from './admin/layouts/header/header.component';
import { SidebarComponent } from './admin/layouts/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersListComponent } from './admin/users/users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddUserComponent } from './admin/users/add-user/add-user.component';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatDialogModule } from '@angular/material/dialog';
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import { AddPostComponent } from './admin/posts/add-post/add-post.component';
import { AdminPostsListComponent } from './admin/posts/admin-posts-list/admin-posts-list.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {AdminGuard} from "./admin.guard";
import { EditUserComponent } from './admin/users/edit-user/edit-user.component';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    PostsListComponent,
    MyPostsListComponent,
    SinglePostComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    UsersListComponent,
    AddUserComponent,
    AddPostComponent,
    AdminPostsListComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 6000,
      progressBar: false,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
      tapToDismiss: true,
    }),
  ],
  providers: [
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
