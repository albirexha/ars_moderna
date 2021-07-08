<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('hello',fn()=>'hello, world');

//Route::get('users/login', [\App\Http\Controllers\UserController::class, 'login'])->name('login');
//Route::post('users/do_login', [\App\Http\Controllers\UserController::class, 'doLogin'])->name('do_login');

Route::get('/loginform', [\App\Http\Controllers\UserController::class, 'login'])->name('loginform');
Route::post('register', [AuthController::class, 'register']);
Route::post('register_user', [AuthController::class, 'register_user']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('authUser', [AuthController::class, 'authUser']);
    Route::get('authUserRole/{id}','AuthController@authUserRole');
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::group(['middleware' => ['admin','auth:sanctum']], function () {
    Route::get('test',function (){
        echo 'asd';
    });
    Route::post('user_posts',[\App\Http\Controllers\UserController::class,'user_posts']);

});

Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');


//Route::group(['middleware' => ['auth:sanctum']], function () {
//    Route::post('users/auth-user', [\App\Http\Controllers\UserController::class, 'authUser']);
//    Route::get('user_posts',[\App\Http\Controllers\UserController::class,'user_posts']);
//
//});

Route::group(['middleware' => ['admin','auth:sanctum']], function () {
    Route::resource('users', \App\Http\Controllers\UserController::class);
});

Route::get('user/{id}',[\App\Http\Controllers\UserController::class,'user_id']);

Route::resource('categories', \App\Http\Controllers\CategoryController::class);

Route::put('user/{id}',[\App\Http\Controllers\UserController::class,'edit_user']);
Route::put('edit_profile/{id}',[\App\Http\Controllers\UserController::class,'edit_profile'])->middleware('auth:sanctum');


Route::post('user/change-password',[\App\Http\Controllers\UserController::class,'change_password'])->middleware('auth:sanctum');

Route::post('new_artist',[\App\Http\Controllers\ArtistController::class,'new_artist'])->middleware('auth:sanctum');

Route::resource('posts',\App\Http\Controllers\PostController::class,['except' => [ 'destroy']]);

Route::delete('posts/{id}',[\App\Http\Controllers\PostController::class,'destroy'])->middleware('auth:sanctum');

Route::resource('favorites',\App\Http\Controllers\FavoriteController::class);

Route::get('my_posts', [\App\Http\Controllers\PostController::class,'my_posts'])->middleware('auth:sanctum');
Route::get('post/{id}', [\App\Http\Controllers\PostController::class,'view_post']);

Route::get('isAdmin',[AuthController::class,'isAdmin'])->middleware('auth:sanctum');

Route::get('cat_posts/{id}',[\App\Http\Controllers\PostController::class,'getPostsByCategory']);
Route::get('similar_posts/{id}',[\App\Http\Controllers\PostController::class,'similarPosts']);

//Route::resource('likes',\App\Http\Controllers\LikeController::class)->middleware('auth:sanctum');

Route::get('new_like/{id}',[\App\Http\Controllers\LikeController::class,'new_like'])->middleware('auth:sanctum');
Route::get('new_favorite/{id}',[\App\Http\Controllers\FavoriteController::class,'new_favorite'])->middleware('auth:sanctum');
Route::get('likes_no/{id}',[\App\Http\Controllers\PostController::class,'likes_number']);

Route::get('check_like/{id}',['App\Http\Controllers\PostController','check_like'])->middleware('auth:sanctum');
Route::get('check_favorite/{id}',['App\Http\Controllers\FavoriteController','check_favorite'])->middleware('auth:sanctum');
Route::get('my_favorites', [\App\Http\Controllers\FavoriteController::class,'my_favorites'])->middleware('auth:sanctum');

Route::get('top_posts',[\App\Http\Controllers\PostController::class,'top_posts']);
Route::get('latest_artists',[\App\Http\Controllers\ArtistController::class,'latest_artists']);
Route::get('artist_by_id/{id}',[\App\Http\Controllers\ArtistController::class,'artist_by_id']);

Route::get('latest_user_posts/{id}',[\App\Http\Controllers\PostController::class,'latestUserPosts']);

//Route::group(['middleware' => ['admin']], function () {
//    Route::get(,[\App\Http\Controllers\UserController::class,'user_posts']);
//});

//Route::delete('artists/delete/{id}',[\App\Http\Controllers\ArtistController::class,'destroy']);

