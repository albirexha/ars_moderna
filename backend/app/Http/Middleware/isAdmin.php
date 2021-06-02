<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::user()) {
            if (Auth::user()->role() == 1) {
                return $next($request);
            }
        }

        $response = [
            'status' => 2,
            'message' => 'Unauthorized',
        ];
        return response()->json($response, 413);


        //echo 'asd';
        //return redirect('login');
    }
}