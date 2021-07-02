<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        $response = [
            'msg' => 'List of all users',
            'users' => $users
        ];
        return response()->json($response, 201);
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
            'role' => 'required',
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user = new User();

        $user->role = $request->input('role');
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));

        if ($user->save()) {
            $user->view_user = [
                'href' => 'api/user/' . $user->id,
                'method' => 'GET'
            ];
            $respose = [
                'msg' => 'User created',
                'user' => $user
            ];
            return response()->json([$respose], 201);
        }
        return response()->json('User is not created', 404);
        //return response()->json(['success'=>$user]);
    }


    public function user_id($id){
        $user = User::findOrFail($id);
        $response = [
            'msg' => 'User Information',
            'user' => $user
        ];
        return response()->json([$response], 201);
    }

    public function show($id)
    {
    }



    public function edit_user(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required',
            //'isArtist' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        //$user->isArtist = $request->input('isArtist');

        if ($user->save()) {
            $user->view_user = [
                'href' => 'v1/user/' . $user->id,
                'method' => 'GET'
            ];
            $response = [
                'msg' => "User updated",
                'service' => $user
            ];
            return response()->json($response, 201);
        }
        return response()->json('User is not updated');
    }

    public function edit_profile(Request $request, $id)
    {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user->name = $request->input('name');
        $user->email = $request->input('email');

        if ($user->save()) {
            $response = [
                'msg' => "User updated",
                'service' => $user
            ];
            return response()->json($response, 201);
        }
        return response()->json('User is not updated');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->delete()) {
            return response()->json('User deleted!', 200);
        }
        return response()->json('User is not deleted', 404);
    }


    public function user_posts(Request $request){
        $user = User::findOrFail($request->input('user_id'));
        $posts = $user->post()->get();

        if($posts) {
            foreach ($posts as $post) {
                echo $post->title;
            }
        }
    }

    public function change_password(Request $request){
        $user = Auth::user();
        if($user) {
            $old_password = $request->current_password;
            $password = $request->new_password;
            if (Auth::guard('web')->attempt(['id'=>$user->id,'password'=>$old_password])) {
                $user->password = Hash::make($password);
                if ($user->save()) {
                    return response()->json('Password is successfully changed.');
                } else {
                    return response()->json('Password failed to change!', 404);
                }
            } else {
                return response()->json('Incorrect old password, try again!', 404);
            }
        }else {
            return response()->json('Password failed to change!', 404);
        }
    }
}
