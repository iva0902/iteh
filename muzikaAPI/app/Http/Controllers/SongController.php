<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongResource;
use App\Models\Song;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;

class SongController extends BaseController
{
    public function index()
    {
        $songs = Song::all();
        return $this->success(SongResource::collection($songs));
    }

    public function show($id)
    {
        $song = Song::find($id);
        if (!$song) {
            return $this->error('Song not found', [], 404);
        }
        return $this->success(new SongResource($song));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'artist' => 'required',
            'url' => 'required',
            'duration' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }
        $song = Song::create($request->all());
        return $this->success(new SongResource($song), 'Song created', 201);
    }

    public function update(Request $request, $id)
    {
        $song = Song::find($id);
        if (!$song) {
            return $this->error('Song not found', [], 404);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'artist' => 'required',
            'url' => 'required',
            'duration' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return $this->error('Validation Error', $validator->errors());
        }
        $song->update($request->all());
        return $this->success(new SongResource($song), 'Song updated');
    }

    public function destroy($id)
    {
        $song = Song::find($id);
        if (!$song) {
            return $this->error('Song not found', [], 404);
        }
        $song->delete();
        return $this->success(null, 'Song deleted');
    }
}
