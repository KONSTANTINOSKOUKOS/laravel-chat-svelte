<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function show()
    {
        return Inertia::render('Login');
    }

    public function login(Request $req)
    {
        $req->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['boolean']
        ]);

        if (Auth::attempt(['email' => $req->email, 'password' => $req->password], $req->remember)) {
            $req->session()->regenerate();
            return redirect()->intended('/');
        }

        return back()->withErrors([
            'password' => 'the provided email and/or password could not be found'
        ])->onlyInput('email');
    }

    public function logout(Request $req)
    {
        Auth::logout();

        $req->session()->invalidate();

        $req->session()->regenerateToken();

        return redirect('/login');
    }
}
