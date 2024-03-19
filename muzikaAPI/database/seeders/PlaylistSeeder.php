<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaylistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            \App\Models\Playlist::create([
                'name' => $faker->sentence,
                'description' => $faker->paragraph,
                'user_id' => rand(1, 11)
            ]);
        }
    }
}
