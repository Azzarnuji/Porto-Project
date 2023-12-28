<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenLoginModel extends Model
{
    use HasFactory;
    protected $guarded = [
        'id'
    ];
    protected $table = 'token_login';
    public $timestamps = false;
}
