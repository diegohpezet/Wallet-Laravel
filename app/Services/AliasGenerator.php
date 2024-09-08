<?php

namespace App\Services;

use Faker\Factory as Faker;
use App\Models\User;

class AliasGenerator
{
    public function generateUniqueAlias()
    {
        $faker = Faker::create();

        do {
            $words = $faker->words(rand(2, 3), true);
            $alias = str_replace(' ', '.', $words);
        } while (User::where('alias', $alias)->exists());

        return $alias;
    }
}
