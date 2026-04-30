<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Fortify\CreateNewUser;
use App\Contracts\RegisterResponse;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Fortify\Fortify;

class RegisterController extends Controller
{
    public function __construct(
        protected CreateNewUser $creator,
        protected RegisterResponse $registerResponse,
    ) {}

    public function create(): \Laravel\Fortify\Contracts\RegisterViewResponse
    {
        return app(\Laravel\Fortify\Contracts\RegisterViewResponse::class);
    }

    public function store(Request $request): RegisterResponse|\Illuminate\Http\RedirectResponse
    {
        $input = $request->all();

        if (config('fortify.lowercase_usernames') && $request->has(Fortify::username())) {
            $input[Fortify::username()] = Str::lower($request->{Fortify::username()});
        }

        $user = $this->creator->create($input);

        event(new Registered($user));

        // Don't auto-login, redirect to login page
        return redirect()->route('login')->with('status', 'Akun berhasil dibuat. Silakan masuk.');
    }
}