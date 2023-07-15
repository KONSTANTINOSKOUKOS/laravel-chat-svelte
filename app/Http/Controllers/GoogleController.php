<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::updateOrCreate([
            'name' => $googleUser->getName(),
            'google_id' => $googleUser->getId(),
            'avatar_url' => $googleUser->getAvatar()
        ]);

        Auth::login($user);

        return redirect()->intended('/');
    }
}
