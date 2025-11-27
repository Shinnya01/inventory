<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
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

        // Log incoming data for debugging
        Log::info('ProductController@update called', [
            'id' => $product->id,
            'payload' => $validated,
        ]);

        // Update product
        $updated = $product->update($validated);

        Log::info('ProductController@update result', [
            'id' => $product->id,
            'updated' => $updated,
            'product' => $product->toArray(),
        ]);

        // If the request comes from Inertia (SPA), return a redirect so Inertia can handle it.
        if ($request->header('X-Inertia')) {
            return redirect()->route('product-management.index')
                ->with('success', 'Product updated successfully.');
        }

        // Fallback: return JSON for API callers
        return response()->json([
            'success' => true,
            'product' => $product,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Log::info('ProductController@destroy called', ['id' => $product->id]);

        $deleted = $product->delete();

        Log::info('ProductController@destroy result', [
            'id' => $product->id,
            'deleted' => $deleted,
        ]);

        // If the request comes from Inertia, redirect back to the index so the SPA can handle the redirect.
        if (request()->header('X-Inertia')) {
            return redirect()->route('product-management.index')
                ->with('success', $deleted ? 'Product deleted.' : 'Product could not be deleted.');
        }

        // Fallback JSON response
        return response()->json([
            'success' => true,
            'deleted' => (bool) $deleted,
        ]);
    }
}
