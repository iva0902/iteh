<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaylistItem extends Model
{
    use HasFactory;

    protected $table = 'playlist_items';

    protected $fillable = [
        'playlist_id',
        'date_added',
        'song_id',
    ];

    public function playlist()
    {
        return $this->belongsTo(Playlist::class);
    }

    public function song()
    {
        return $this->belongsTo(Song::class);
    }
}
