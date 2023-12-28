<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersModel extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected $hidden = ["password"];
    protected $table = "users";
    protected $primaryKey = "id";
    public $timestamps = true;

    public function withDetailUser()
    {
        return $this->hasOne(DetailUsers::class, "email", "email");
    }
}
