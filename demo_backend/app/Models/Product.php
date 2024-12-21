<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'image', 'user_id'];

    
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return url('' . $this->image); // Generates a URL relative to the public directory
    }
    

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
