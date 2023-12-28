<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailUsers extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected $table = "detail_users";
    public $timestamps = false;
}
