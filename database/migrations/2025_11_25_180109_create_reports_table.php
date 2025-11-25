<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();

            // Link to the product
            $table->foreignId('product_id')->constrained()->onDelete('cascade');

            // Who added or updated the stock (admin or user)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Type of movement: 'in' or 'out'
            $table->enum('movement_type', ['in', 'out']);

            // Quantity moved
            $table->integer('quantity');

            // Optional detail: e.g., "Stock added by Admin"
            $table->string('detail')->nullable();

            // Snapshot of current stock at this moment
            $table->integer('current_stock')->default(0);

            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
