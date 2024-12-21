<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request)
    {
        $validated = $request->validated();

        // Handle image upload using the ImageService
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $this->imageService->uploadImage($request, 'image');
        }

        // Create the product
        $product = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'image' => $imagePath, // Save the image path
            'user_id' => Auth::id(),
        ]);

        // Return the created product as a resource
        return response()->json($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, Product $product)
    {
        $validated = $request->validated();

        // Handle image upload if provided
        $imagePath = $product->image; // Default to existing image
        if ($request->hasFile('image')) {
            // Delete the old image if it's being replaced
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            // Upload the new image
            $imagePath = $this->imageService->uploadImage($request, 'image', null, 'product_images');
        }

        // Update the product
        $product->update([
            'name' => $validated['name'] ?? $product->name,
            'description' => $validated['description'] ?? $product->description,
            'price' => $validated['price'] ?? $product->price,
            'image' => $imagePath, // Update the image path
        ]);

        // Return the updated product as a resource
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete the product's image file from the storage if exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        // Delete the product record
        $product->delete();

        // Return a successful response
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
