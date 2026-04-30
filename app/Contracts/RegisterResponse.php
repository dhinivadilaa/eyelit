<?php

namespace App\Contracts;

use Illuminate\Contracts\Support\Responsable;

class RegisterResponse implements Responsable
{
    public function toResponse($request)
    {
        $request->session()->forget('login');
        return redirect()->route('login')->with('status', 'Akun berhasil dibuat. Silakan masuk.');
    }
}