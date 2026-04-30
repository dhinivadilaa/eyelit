<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsernameCheckController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $username = $request->query('username');

        if (!$username) {
            return response()->json(['available' => false]);
        }

        $exists = \App\Models\User::where('username', $username)->exists();

        return response()->json(['available' => !$exists]);
    }
}