<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;

class PlaylistController extends BaseController
{

    public function index()
    {
        $playlists = Playlist::all();
        return $this->success($playlists);
    }

    public function show($id)
    {
        $playlist = Playlist::find($id);
        if ($playlist) {
            return $this->success($playlist);
        }
        return $this->error('Playlist not found', [], 404);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }
        $playlist = Playlist::create($request->all());
        return $this->success($playlist, 'Playlist created successfully');
    }

    public function update(Request $request, $id)
    {
        $playlist = Playlist::find($id);
        if (!$playlist) {
            return $this->error('Playlist not found', [], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }
        $playlist->name = $request->name;
        $playlist->description = $request->description;
        $playlist->user_id = $request->user_id;
        $playlist->save();
        return $this->success($playlist, 'Playlist updated successfully');
    }

    public function destroy($id)
    {
        $playlist = Playlist::find($id);
        if (!$playlist) {
            return $this->error('Playlist not found', [], 404);
        }
        $playlist->delete();
        return $this->success($playlist, 'Playlist deleted successfully');
    }
}
