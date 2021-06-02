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

        $artist->phone = $request->input('phone');
        $user = User::findOrFail($request->input('user_id'));

        if (!Artist::where('user_id', $request->input('user_id'))->exists()) {
            if ($user->artist()->save($artist)) {
                $artist->view_artist = [
                    'href' => 'api/artist/' . $artist->id,
                    'method' => 'GET'
                ];
                $respose = [
                    'msg' => 'Artist created',
                    'artist' => $artist
                ];

                $user->isArtist = true;
                $user->save();

                return response()->json([$respose], 201);
            }

            return response()->json('Artist is not created', 404);
        }

        return response()->json('Artist exists!', 404);

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
        $artist = Artist::findOrFail($id);
        $user = User::findOrFail($artist->user_id);
        $user->isArtist = false;
        $user->save();

        if ($artist->delete()) {
            $response = [
                'msg' => 'Artist deleted',
                'create' => [
                    'href' => 'api/artist',
                    'method' => 'POST',
                    'params' => 'name, email, password'
                ]
            ];
            return response()->json($response, 200);
        }
        return response()->json('Artist is not deleted', 404);
    }
}
