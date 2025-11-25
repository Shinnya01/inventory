<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    // Mass assignable attributes
    protected $fillable = [
        'product_id',
        'user_id',
        'movement_type',
        'quantity',
        'detail',
        'current_stock',
    ];

    /**
     * A report belongs to a product.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * A report belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
