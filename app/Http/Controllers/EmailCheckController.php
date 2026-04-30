<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailCheckController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $email = $request->query('email');

        if (!$email) {
            return response()->json(['available' => false]);
        }

        $exists = \App\Models\User::where('email', strtolower($email))->exists();

        return response()->json(['available' => !$exists]);
    }
}