<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

         User::create([
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('admin123'),
                'role' => 'admin',
         ]);

        \App\Models\User::factory(10)->create();

        $this->call([
            PlaylistSeeder::class,
            SongSeeder::class,
            PlaylistItemSeeder::class,
        ]);
    }
}
