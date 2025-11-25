<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Stock;
use App\Models\Report;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return Inertia::render('product-management', compact('products'));
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
        ]);

        $product = Product::create($validated);

        Stock::create([
            'product_id'    => $product->id,
            'quantity'      => $validated['stock'],
            'movement_type' => 'in',
            'user_id'       => auth()->id(),
        ]);

        Report::create([
            'product_id'    => $product->id,
            'user_id'       => auth()->id(),
            'movement_type' => 'in',
            'quantity'      => $validated['stock'],
            'detail'        => 'Stock added by ' . auth()->user()->name,
            'current_stock' => $validated['stock'],
        ]);

        return back()->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        // Update product
        $product->update($validated);

        // Return to previous page with success message
        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
