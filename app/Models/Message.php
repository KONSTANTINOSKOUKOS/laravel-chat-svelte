<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasRelationships;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory, HasUuids, HasRelationships;

    protected $table = 'messages';

    protected $fillable = [
        'content',
        'user_id'
    ];

    protected $hidden = [
        ''
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
