<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaylistItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 100; $i++) {
            \App\Models\PlaylistItem::create([
                'playlist_id' => rand(1, 10),
                'song_id' => rand(1, 20),
                'date_added' => $faker->dateTimeThisYear(),
            ]);
        }
    }
}
