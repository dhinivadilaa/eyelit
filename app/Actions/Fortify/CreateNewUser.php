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
            'username' => [
                'required',
                'string',
                'max:255',
                'min:6',
                'regex:/^[a-zA-Z0-9]+$/',
                Rule::unique(User::class),
            ],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'no_hp' => ['required', 'string', 'max:12', 'min:11'],
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers(),
            ],
        ], [
            'username.regex' => 'Nama pengguna hanya boleh huruf dan angka.',
            'no_hp.min' => 'Nomor HP harus 11-12 digit.',
            'no_hp.max' => 'Nomor HP harus 11-12 digit.',
        ])->validate();

        return User::create([
            'username' => $input['username'],
            'email' => strtolower($input['email']),
            'no_hp' => $input['no_hp'],
            'password' => $input['password'],
            'peran' => 'Pengguna',
            'status_akun' => 'Aktif',
            'tanggal_daftar' => now(),
        ]);
    }
}