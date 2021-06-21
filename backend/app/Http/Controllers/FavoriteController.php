<?php

namespace App\Http\Controllers;

use App\Models\Favorites;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
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
            'post_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $user_id = $request->input('user_id');
        $post_id = $request->input('post_id');

        if(!(User::findOrFail($user_id) || Post::findOrFail($post_id))){
            return response()->json('Invalid data!', 404);
        }

        $favorite = new Favorites();
        $favorite->user_id = $user_id;
        $favorite->post_id = $post_id;

        if ($favorite->save()) {
            $respose = [
                'msg' => 'Favorite created',
                'favorite' => $favorite
            ];
            return response()->json([$respose], 201);
        }
        return response()->json('Favorite is not created', 404);
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
}
