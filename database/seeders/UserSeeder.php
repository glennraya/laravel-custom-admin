<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'Software Engineer', 'DevOps', 'Database Analyst', 'Cyber Security Consultant', 'Project Manager',
            'System Architect', 'QA Engineer', 'Product Owner', 'UI/UX Designer', 'Scrum Master',
        ];
        shuffle($roles);

        foreach ($roles as $role) {
            User::create([
                'name' => fake()->name(),
                'role' => $role,
                'email' => fake()->unique()->safeEmail(),
                'email_verified_at' => now(),
                'active' => false,
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
            ]);
        }

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
