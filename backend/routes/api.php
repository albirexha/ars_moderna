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

Route::resource('users',\App\Http\Controllers\UserController::class);

Route::resource('artists',\App\Http\Controllers\ArtistController::class);
Route::resource('posts',\App\Http\Controllers\PostController::class);

Route::get('my_posts', [\App\Http\Controllers\PostController::class,'my_posts'])->middleware('auth:sanctum');
Route::get('post/{id}', [\App\Http\Controllers\PostController::class,'view_post']);
Route::get('isAdmin',['middleware' => ['admin','auth:sanctum']],'isAdmin');

//Route::group(['middleware' => ['admin']], function () {
//    Route::get(,[\App\Http\Controllers\UserController::class,'user_posts']);
//});

//Route::delete('artists/delete/{id}',[\App\Http\Controllers\ArtistController::class,'destroy']);

