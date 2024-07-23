<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
Use App\Models\Student;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data=Student::create([
            "name"=>'khalid',
            'fname'=>'khairullah',
            'province'=>'wardak',
            'phone'=>'0766064640'
        ]);
    }
}
