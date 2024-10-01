<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Hashitha Dilshan',
            'email' => 'hashithadiljay@gmail.com',
            'password' => Hash::make('Hashitha@1998'),
            'email_verified_at' => time(),
        ]);
        Project::factory()->count(30)->hasTasks(30)->create();
    }
}
