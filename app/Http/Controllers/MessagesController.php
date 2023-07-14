<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    public function index()
    {

        $msgs = Message::query()
            ->select(['messages.content', 'messages.id', 'users.id as author_id', 'users.name as author_name', 'users.avatar_url as author_avatar_url'])
            ->join('users', 'users.id', '=', 'messages.user_id')
            ->get();

        // return "<pre>ok</pre><script>document.querySelector('pre').textContent=JSON.stringify($msgs, null, 2);</script>";

        return inertia('Chat', [
            '_user' => fn () => auth()->user(),
            'messages' => $msgs
        ]);
    }

    public function store(Request $req)
    {
        if (!auth()->check()) return redirect('/login');

        $req->validate([
            'content' => ['required', 'string'],
        ]);

        $_msg = Message::create([
            'content' => $req->content,
            'user_id' => auth()->user()->id
        ]);

        $msg = Message::where('messages.id', $_msg->id)
            ->select(['messages.content', 'messages.id', 'users.id as author_id', 'users.name as author_name', 'users.avatar_url as author_avatar_url'])
            ->join('users', 'users.id', '=', 'messages.user_id')
            ->get();

        // return "<pre>ok</pre><script>document.querySelector('pre').textContent=JSON.stringify($msg, null, 2);</script>";
        
        broadcast(new MessageSent($msg))->toOthers();

        return redirect('/');
    }

    public function update(Request $req)
    {
        if (!auth()->check()) return redirect('/login');

        $req->validate([
            'liked' => ['required', 'boolean']
        ]);

        return response()->json(['validated' => true]);
    }
}
