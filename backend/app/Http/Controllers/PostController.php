<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $posts = Post::all();
        if($posts){
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
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $picture = "";

        if ($request->hasFile('image'))
        {
            $file      = $request->file('image');
            $filename  = $file->getClientOriginalName();
            $extension =  $file->getClientOriginalExtension();
            $picture   = date('His').'-'.$filename;
            //move image to public/img folder
            $path = $file->storeAs('public/imgs', $picture );

            //$file->move(public_path('img'), $picture);
            //return response()->json(["message" => "Image Uploaded Succesfully"]);
        }

        $post = new Post();

        $post->title = $request->input('title');
        $user = User::findOrFail($request->input('user_id'));
        $post->image = $picture;

        if ($user->post()->save($post)) {
            $post->view_post = [
                'href' => 'api/post/' . $post->id,
                'method' => 'GET'
            ];
            $respose = [
                'msg' => 'Post created',
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
        //
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
        $post=Post::with('user')->find($id);
        if($post){
            $respose = [
                'msg' => 'Post',
                'post' => $post
            ];
            return response()->json($respose, 201);
        }

        return response()->json('No post!', 404);

    }
}
