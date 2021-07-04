<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Post;
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
            'first_name' => 'required',
            'last_name' => 'required',
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

        $artist->first_name = $request->input('first_name');
        $artist->last_name = $request->input('last_name');
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

    public function artist_by_id($id){
        $artist = Artist::with('user')->where('user_id',$id)->first();
        if($artist){
            $totalPosts = Post::where('user_id',$id)->get();
            $postsCount = Post::where('user_id',$id)->count();
            $totalLikes = 0;
            if($totalPosts) {
                foreach ($totalPosts as $post) {
                    $totalLikes += $post->total_likes;
                }
            }

            $artist->totalPosts = $postsCount;
            $artist->totalLikes = $totalLikes;

            return response()->json($artist, 201);

        }else{
            return response()->json('Artist not found!',404);
        }
    }

    public function store(Request $request)
    {

    }

    public function latest_artists(){
        $artists = Artist::with('user')->orderBy('created_at','DESC')->limit(4)->get();
        return response()->json($artists, 201);
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
