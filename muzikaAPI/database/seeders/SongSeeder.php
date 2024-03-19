<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 20; $i++) {
            Song::create([
                'title' => $faker->sentence,
                'artist' => $faker->name,
                'url' => 'https://www.youtube.com/',
                'duration' => rand(180, 400),
                ]);
        }
    }
}
