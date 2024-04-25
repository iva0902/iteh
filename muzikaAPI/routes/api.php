<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'App\Http\Controllers\LoginController@login');
Route::post('/register', 'App\Http\Controllers\LoginController@register');

Route::apiResource('songs', 'App\Http\Controllers\SongController')->only(['index', 'show']);

Route::get('/playlists', 'App\Http\Controllers\PlaylistController@index');
Route::get('/playlists/{id}', 'App\Http\Controllers\PlaylistController@show');

Route::get('/playlist-items', 'App\Http\Controllers\PlaylistItemController@index');
Route::get('/playlist-items/{id}', 'App\Http\Controllers\PlaylistItemController@show');

Route::middleware('auth:sanctum')->post('/logout', 'App\Http\Controllers\LoginController@logout');

Route::get('/search', 'App\Http\Controllers\PlaylistController@search');
Route::get('/paginate', 'App\Http\Controllers\PlaylistItemController@paginate');
Route::get('/find-by-playlist/{id}', 'App\Http\Controllers\PlaylistItemController@findByPlaylist');

Route::get('/number', 'App\Http\Controllers\PlaylistController@numberOfItemsPerPlaylist');
Route::get('/find-by-user/{id}', 'App\Http\Controllers\PlaylistController@findByUser');

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/songs', 'App\Http\Controllers\SongController@store');
    Route::put('/songs/{id}', 'App\Http\Controllers\SongController@update');
    Route::put('/playlists/{id}', 'App\Http\Controllers\PlaylistController@update');
    Route::post('/playlists', 'App\Http\Controllers\PlaylistController@store');

    Route::post('/playlist-items', 'App\Http\Controllers\PlaylistItemController@store');
    Route::put('/playlist-items/{id}', 'App\Http\Controllers\PlaylistItemController@update');

    //delete routes
    Route::delete('/songs/{id}', 'App\Http\Controllers\SongController@destroy');
    Route::delete('/playlists/{id}', 'App\Http\Controllers\PlaylistController@destroy');
    Route::delete('/playlist-items/{id}', 'App\Http\Controllers\PlaylistItemController@destroy');
});