<?php

namespace App\Http\Controllers;

use App\Models\Buy;
use App\Models\Stock;
use App\Models\Report;
use App\Models\Product;
use Illuminate\Http\Request;

class BuyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        // Check stock
        if ($product->stock < $validated['quantity']) {
            return back()->with('error', 'Not enough stock available.');
        }

        // Deduct stock
        $product->stock -= $validated['quantity'];
        $product->save();

        // Log stock movement (OUT)
        Stock::create([
            'product_id'    => $product->id,
            'quantity'      => $validated['quantity'],
            'movement_type' => 'out',
            'user_id'       => auth()->id(),
        ]);

        // Log report entry (OUT)
        Report::create([
            'product_id'    => $product->id,
            'user_id'       => auth()->id(),
            'movement_type' => 'out',
            'quantity'      => $validated['quantity'],
            'detail'        => 'Product bought by ' . auth()->user()->name,
            'current_stock' => $product->stock,      // after deduction
        ]);

        // Save Buy transaction
        Buy::create([
            'product_id'  => $product->id,
            'user_id'     => auth()->id(),
            'quantity'    => $validated['quantity'],
            'total_price' => $product->price * $validated['quantity'],
        ]);

        return back()->with('success', 'Purchase successful!');
    }



    /**
     * Display the specified resource.
     */
    public function show(Buy $buy)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Buy $buy)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Buy $buy)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Buy $buy)
    {
        //
    }
}
