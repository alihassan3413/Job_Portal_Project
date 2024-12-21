<?php

// app/Http/Requests/ProductUpdateRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Update with proper authorization logic if needed
    }

    public function rules()
    {
        return [
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The product name is required.',
            'description.required' => 'The product description is required.',
            'price.required' => 'The price of the product is required.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a type of jpeg, png, jpg, gif, or svg.',
            'image.max' => 'The image must not be larger than 2MB.',
        ];
    }
}

