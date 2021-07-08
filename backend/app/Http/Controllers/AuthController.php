<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\Artist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class AuthController extends Controller
{
    //
    public function register(RegisterRequest $request)
    {

        $user = User::create([
            'name' => $request->input('full_name'),
            'email' => $request->input('email'),
            'role' => $request->input('role'),
            'password' => Hash::make($request->input('password')),
        ]);

//        $token = $user->createToken('auth_token')->plainTextToken;
//
//        return response()->json([
//            'access_token' => $token,
//            'token_type' => 'Bearer',
//        ]);

        return response($user, Response::HTTP_CREATED);
    }

    // app/Http/Controllers/AuthController.php

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
//            return response()->json([
//                'message' => 'Invalid login details'
//            ], 401);

            return \response([
                'error' => 'Invalid login details'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();
        //$user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('jwt',$token,60*24);

        return \response([
            'jwt' => $token
        ])->withCookie($cookie);

//        return response()->json([
//            'access_token' => $token,
//            'token_type' => 'Bearer',
//        ]);
    }

    public function authUser(Request $request)
    {
        $user = $request->user();
        if($user) {
            $artist = Artist::where('user_id', $user->id)->first();
            $user->artist = $artist;
        }

        return $user;
    }

    public function isAdmin(Request $request){
        if($user = $request->user()){
            if($user->role==1)
                $respose = [
                    'msg' => 'Success Admin!',
                    'status' => '201'
                ];
            return response()->json($respose, 201);
        }
        return response()->json('User is not created', 404);
    }

    public function logout(){
        $cookie = Cookie::forget('jwt');

        return \response([
            'message' => 'success'
        ])->withCookie($cookie);
    }

    public function register_user(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user = new User();

        $user->role = 0;
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
    }

}
