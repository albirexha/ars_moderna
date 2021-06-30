<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Images;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $allPosts = Post::withCount('likes')->orderBy('id','DESC')->get();
        $posts = [];
        if($allPosts){
            foreach ($allPosts as $post){
                $post->date = $post->created_at->diffForHumans();
                $posts[] = $post;
            }
            $respose = [
                'msg' => 'All posts',
                'posts' => $posts
            ];
            return response()->json($respose, 201);
        }
        return response()->json('No posts!', 404);
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'title' => 'required',
            'images' => 'required',
            'images.*' => 'image',
            'category_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json('Invalid data provided!', 401);
        }

        $images  = [];

        foreach ($request->file('images') as $photo) {
            $filename  = $photo->getClientOriginalName();
            $extension =  $photo->getClientOriginalExtension();
            $picture   = date('His').'-'.$filename;
            $images[] = $picture;
            $path = $photo->storeAs('public/imgs', $picture );
        }

        $post = new Post();

        $post->title = $request->input('title');
        $user = User::findOrFail($request->input('user_id'));
        $post->image = $images[0];
        $post->category_id = $request->input('category_id');

        if ($user->post()->save($post)) {
            foreach ($images as $imagee){
                $image = new Images();
                $image->post_id = $post->id;
                $image->image = $imagee;
                $image->save();
            }
            $respose = [
                'msg' => 'Post created!',
                'post' => $post
            ];
            return response()->json([$respose], 201);
        }
        return response()->json('Post failed!', 404);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $post = Post::findOrFail($id);
        $postCheck = Post::where([['id',$id],['user_id',$user->id]])->count();
        if($user->role == 1 || $postCheck){
            if ($post->delete()) {
                return response()->json('Post deleted!', 200);
            }
            return response()->json('Post deleting failed!', 404);
        }
        return response()->json('No authorization!', 401);
    }

    public function my_posts(){

        $user = Auth::user();

        if($user){
            $posts = $user->post()->get();

            if(count($posts)>0){
                $respose = [
                    'msg' => 'My posts',
                    'posts' => $posts
                ];
                return response()->json($respose, 201);
            }
            return response()->json('No posts!', 404);
        }
    }

    public function view_post($id){
        $post=Post::with(['user','images'])->find($id);
        if($post){
            $respose = [
                'msg' => 'Post',
                'post' => $post
            ];
            return response()->json($respose, 201);
        }

        return response()->json('No post!', 404);
    }

    public function likes_number($id){
        $post = Post::findOrFail($id);
        $nr_likes = $post->likes()->count();

        return response()->json($nr_likes, 201);
    }

    public function top_posts(){

        $top_posts = Post::orderBy('total_likes','DESC')->limit(2)->get();
        return response()->json($top_posts, 201);
    }

    public function check_like($id){

        $user_id = Auth::user()->id;
        $post_id = $id;

        $likeCheck = Like::where([['post_id',$post_id],['user_id',$user_id]])->count();

        if (!(User::findOrFail($user_id) || Post::findOrFail($post_id))) {
            return response()->json('Invalid data!', 404);
        }

        if($likeCheck>0){
            return response()->json('Liked',201);
        }
        return response()->json('Not liked',202);
    }

    public function getPostsByCategory($id){
        $posts = Category::findOrFail($id)->posts()->get();
        $respose = [
            'msg' => 'Posts',
            'posts' => $posts
        ];
        return response()->json($respose, 201);
    }
}
