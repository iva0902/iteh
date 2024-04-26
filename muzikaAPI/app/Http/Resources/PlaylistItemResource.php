<?php

namespace App\Http\Resources;

use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaylistItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $playlist = Playlist::find($this->playlist_id);
        return [
            'id' => $this->id,
            'playlist_id' => $this->playlist_id,
            'playlist' => $playlist ? $playlist->name : null,
            'song_id' => $this->song_id,
            'song' => new SongResource($this->song),
            'date_added' => $this->date_added,
        ];
    }
}