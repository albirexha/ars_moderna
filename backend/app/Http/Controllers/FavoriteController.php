<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

//    public function store(Request $request)
//    {
//
//        $validator = Validator::make($request->all(), [
//            'user_id' => 'required',
//            'post_id' => 'required',
//        ]);
//
//        if ($validator->fails()) {
//            return response()->json(['error' => $validator->errors()], 401);
//        }
//        $user_id = $request->input('user_id');
//        $post_id = $request->input('post_id');
//
//        if(!(User::findOrFail($user_id) || Post::findOrFail($post_id))){
//            return response()->json('Invalid data!', 404);
//        }
//
//        $favorite = new Favorite();
//        $favorite->user_id = $user_id;
//        $favorite->post_id = $post_id;
//
//        if ($favorite->save()) {
//            $respose = [
//                'msg' => 'Favorite created',
//                'favorite' => $favorite
//            ];
//            return response()->json([$respose], 201);
//        }
//        return response()->json('Favorite is not created', 404);
//    }

    public function new_favorite($id)
    {

        $user_id = Auth::user()->id;
        $post_id = $id;

        $favoriteCheck = Favorite::where([['post_id',$post_id],['user_id',$user_id]])->count();


        if (!(User::findOrFail($user_id) || Post::findOrFail($post_id))) {
            return response()->json('Invalid data!', 404);
        }

        if($favoriteCheck>0){
            $post = Post::findOrFail($post_id);
;
            $favorite = Favorite::where([['post_id',$post_id],['user_id',$user_id]])->first();
            $favorite->delete();

            return response()->json('Favorite removed!', 202);
        }

        $favorite = new Favorite();
        $favorite->user_id = $user_id;
        $favorite->post_id = $post_id;

        if ($favorite->save()) {
            return response()->json('New favorite!', 201);
        }
        return response()->json('Favorite failed!', 404);
    }

    public function check_favorite($id){

        $user_id = Auth::user()->id;
        $post_id = $id;

        $favoriteCheck = Favorite::where([['post_id',$post_id],['user_id',$user_id]])->count();

        if (!(User::findOrFail($user_id) || Post::findOrFail($post_id))) {
            return response()->json('Invalid data!', 404);
        }

        if($favoriteCheck>0){
            return response()->json('Favorite!', 202);
        }

        return response()->json('No favorite!',202);
    }

    public function my_favorites(){
        $user = Auth::user();
        if($user){
            $favorites = Favorite::with('post')->where('user_id',$user->id)->get();

            if(count($favorites)>0){
                $posts = [];
                foreach ($favorites as $favorite){
                    $posts[] = $favorite->post;
                }
                return response()->json($posts, 201);
            }
            return response()->json('No favorites!', 404);
        }
    }


}
