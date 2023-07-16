<?php

namespace App\Models;

use Illuminate\Broadcasting\Channel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Concerns\HasRelationships;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory, HasUuids, HasRelationships, BroadcastsEvents;

    protected $table = 'messages';
    protected $primaryKey = 'id';

    protected $fillable = [
        'content',
        'user_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'id'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    function toArray()
    {
        return [
            'content' => $this->content,
            'author_name' => $this->user->name,
            'author_id' => $this->user->id,
            'author_avatar_url' => $this->user->avatar_url
        ];
    }

    // public function broadcastOn(string $e): array
    // {
    //     return match ($e) {
    //         default => [],
    //         'created' => [new Channel('messages')]
    //     };
    // }
}
