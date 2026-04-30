<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectBasedOnRole
{
    public function handle(Request $request, Closure $next, string $redirectTo = null): Response
    {
        $response = $next($request);

        if ($response instanceof \Illuminate\Http\RedirectResponse && $response->getTargetUrl() === $request->fullUrl()) {
            $user = $request->user();

            if ($user && $user->peran === 'Admin') {
                return redirect('/dashboard');
            }

            return redirect('/');
        }

        return $response;
    }
}