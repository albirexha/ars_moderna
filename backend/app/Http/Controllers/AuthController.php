<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    //
    public function register(RegisterRequest $request)
    {

        $user = User::create([
            'name' => $request->input('name'),
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
        return $request->user();
    }

    public function logout(){
        $cookie = Cookie::forget('jwt');

        return \response([
            'message' => 'success'
        ])->withCookie($cookie);
    }

}
