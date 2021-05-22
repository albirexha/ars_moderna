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
        $user->password = $request->input('password');

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
        $user = User::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required',
            //            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        //        $user->password=Hash::make($request->input('password'));
        $user->role = $request->input('role');

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

    public function authUser(Request $request)
    {
        //var_dump;
        //dd($request);
        $user = $request->user();
        dd($user);
        // $user = User::Where('id', $user->id)->with('role')->get();
        return $user;
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

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return \response([
                'error' => 'Invalid Credentials!'
            ], 401);
        }

        $user = Auth::user();

            $token = $user->createToken('token')->plainTextToken;

            $cookie = cookie('jwt', $token, 60*3);

            return \response([
                'jwt' => $token
            ])->withCookie($cookie);
    }
}
