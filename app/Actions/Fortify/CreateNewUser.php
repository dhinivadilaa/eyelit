<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255', 'min:2'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'no_hp' => ['required', 'string', 'max:20', 'min:10'],
            'password' => ['required', 'string', Password::default(), 'confirmed'],
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => strtolower($input['email']),
            'no_hp' => $input['no_hp'],
            'password' => $input['password'],
            'peran' => 'Pengguna',
            'status_akun' => 'Aktif',
            'tanggal_daftar' => now(),
        ]);
    }
}
