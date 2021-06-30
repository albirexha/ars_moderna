<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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

    public function new_artist(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required',
            'address' => 'required',
            'country' => 'required',
            'birthday' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user_id = Auth::user()->id;
        $user = Auth::user();
        $artist = new Artist();

        $artist->phone = $request->input('phone');
        $artist->address = $request->input('address');
        $artist->country = $request->input('country');
        $artist->birthday = $request->input('birthday');

        if (!Artist::where('user_id', $user_id)->exists()) {
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
            return response()->json('Artist is not created', 406);
        }

        return response()->json('Artist exists!', 406);
    }

    public function store(Request $request)
    {

    }

    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


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
