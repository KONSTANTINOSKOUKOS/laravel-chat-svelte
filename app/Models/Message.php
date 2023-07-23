<?php

namespace App\Models;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Concerns\HasRelationships;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\BroadcastableModelEventOccurred;

class Message extends Model
{
    use HasFactory, HasUuids, HasRelationships, BroadcastsEvents;

    protected $table = 'messages';
    protected $primaryKey = 'id';
    protected $keyType = 'string';

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
            'id' => $this->id,
            'content' => $this->content,
            'author_name' => $this->user->name,
            'author_id' => $this->user->id,
            'author_avatar_url' => $this->user->avatar_url
        ];
    }

    public function broadcastOn(string $e): array
    {
        return match ($e) {
            default => [],
            'created' => [new PresenceChannel('messages')]
        };
    }

    protected function newBroadcastableEvent(string $event): BroadcastableModelEventOccurred
    {
        return (new BroadcastableModelEventOccurred(
            $this,
            $event
        ))->dontBroadcastToCurrentUser();
    }
}
