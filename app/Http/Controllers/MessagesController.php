<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    public function render($msgs = [], $newMsg = [])
    {
        return inertia('Chat', [
            '_user' => auth()->user(),
            'messages' => $msgs,
            'newMsg' => $newMsg
        ]);
    }

    public function index()
    {
        $msgs = Message::all();

        // return "<pre>ok</pre><script>document.querySelector('pre').textContent=JSON.stringify(" . $msgs . ", null, 2);</script>";

        return $this->render($msgs, null);
    }

    public function store(Request $req)
    {
        if (!auth()->check()) return redirect('/login');

        $req->validate([
            'content' => ['required', 'string'],
        ]);

        $newMsg = Message::create([
            'content' => $req->content,
            'user_id' => auth()->user()->id
        ]);

        // return "<pre>ok</pre><script>document.querySelector('pre').textContent=JSON.stringify($newMsg, null, 2);</script>";

        return $this->render(null, $newMsg);
    }
}
