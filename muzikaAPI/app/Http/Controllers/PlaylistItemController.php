<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlaylistItemResource;
use App\Models\Playlist;
use App\Models\PlaylistItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlaylistItemController extends BaseController
{
    public function index()
    {
        $playlistItems = Playlist::all();
        return $this->success(PlaylistItemResource::collection($playlistItems));
    }

    public function show($id)
    {
        $playlistItem = Playlist::find($id);
        if (!$playlistItem) {
            return $this->error('Playlist item not found', [], 404);
        }
        return $this->success(new PlaylistItemResource($playlistItem));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'playlist_id' => 'required|exists:playlists,id',
            'song_id' => 'required|exists:songs,id',
        ]);
        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }
        $playlistItem = PlaylistItem::create([
            'playlist_id' => $request->playlist_id,
            'song_id' => $request->song_id,
            'date_added' => date('Y-m-d H:i:s'),
        ]);
        return $this->success(new PlaylistItemResource($playlistItem), 'Playlist item created', 201);
    }

    public function update(Request $request, $id)
    {
        $playlistItem = PlaylistItem::find($id);
        if (!$playlistItem) {
            return $this->error('Playlist item not found', [], 404);
        }
        $validator = Validator::make($request->all(), [
            'playlist_id' => 'required|exists:playlists,id',
            'song_id' => 'required|exists:songs,id',
        ]);
        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }
        $playlistItem->update($request->all());
        return $this->success(new PlaylistItemResource($playlistItem), 'Playlist item updated');
    }

    public function destroy($id)
    {
        $playlistItem = PlaylistItem::find($id);
        if (!$playlistItem) {
            return $this->error('Playlist item not found', [], 404);
        }
        $playlistItem->delete();
        return $this->success(null, 'Playlist item deleted');
    }

    public function findByPlaylist($id)
    {
        $playlistItems = PlaylistItem::where('playlist_id', $id)->get();
        return $this->success(PlaylistItemResource::collection($playlistItems));
    }

    public function paginate(Request $request)
    {
        $perPage = $request->per_page ?? 10;
        $playlistItems = PlaylistItem::paginate($perPage);
        return $this->success(PlaylistItemResource::collection($playlistItems));
    }
}
