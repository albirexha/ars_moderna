<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\User;
use Validator;
use Illuminate\Http\Request;

class ArtistController extends Controller
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
            'phone' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $artist = new Artist();

        //$artist->user_id = $request->input('user_id');
        $artist->phone = $request->input('phone');
        $user = User::find($request->input('user_id'));

        //$user->artists()->save($artist);

        if  ($user->artist()->save($artist)) {
            $artist->view_artist = [
                'href' => 'api/user/' .  $artist->id,
                'method' => 'GET'
            ];
            $respose = [
                'msg' => 'User created',
                'artist' =>  $artist
            ];

            $user->isArtist = true;
            $user->save();

            return response()->json([$respose], 201);
        }
        return response()->json('Artist is not created', 404);
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
