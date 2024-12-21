<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
        Products Management
      </h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-150 ease-in-out shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Add New Product
      </button>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
      >
        <div class="relative aspect-w-16 aspect-h-9">
          <img
            :src="product.image_url || '/placeholder-product.jpg'"
            :alt="product.name"
            class="w-full h-48 object-cover"
            @error="$event.target.src = '/placeholder-product.jpg'"
          />
        </div>
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ product.name }}
          </h3>
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">
            {{ product.description }}
          </p>
          <div class="flex items-center justify-between">
            <p class="text-blue-600 font-bold text-lg">
              ${{ Number(product.price).toFixed(2) }}
            </p>
            <div class="flex space-x-3">
              <button
                @click="openEditModal(product)"
                class="text-gray-600 hover:text-blue-600 transition-colors duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </button>
              <button
                @click="confirmDelete(product)"
                class="text-gray-600 hover:text-red-600 transition-colors duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Modal Form -->
    <Modals
      v-model="showModal"
      :title="editingProduct ? 'Edit Product' : 'Create New Product'"
      @close="closeModal"
    >
      <template #default>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Product Name</label
            >
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter product name"
              required
            />
          </div>

          <!-- Description Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Description</label
            >
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          <!-- Price Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Price ($)</label
            >
            <div class="relative">
              <span class="absolute left-3 top-2 text-gray-500">$</span>
              <input
                v-model="form.price"
                type="number"
                step="0.01"
                min="0"
                class="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <!-- Image Upload Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Product Image</label
            >
            <div
              class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      @change="handleImageChange"
                      accept="image/*"
                      class="sr-only"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              :disabled="loading"
            >
              {{ loading ? "Saving..." : "Save Product" }}
            </button>
          </div>
        </form>
      </template>
    </Modals>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import Modals from "@/components/Modals.vue";

const productStore = useProductStore();
const showModal = ref(false);
const editingProduct = ref(null);
const loading = ref(false);

const form = ref({
  name: "",
  description: "",
  price: "",
  image: null,
});

const { products } = productStore;
console.log("prod", products);

onMounted(async () => {
  await productStore.fetchProducts();
});

const openCreateModal = () => {
  editingProduct.value = null;
  form.value = {
    name: "",
    description: "",
    price: "",
    image: null,
  };
  showModal.value = true;
};

const openEditModal = (product) => {
  editingProduct.value = product;
  form.value = {
    name: product.name,
    description: product.description,
    price: product.price,
    image: null,
  };
  showModal.value = true;
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    // Create product data object with the form values
    const productData = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      image: form.value.image, // This will be null if no image was selected
    };

    if (editingProduct.value) {
      await productStore.updateProduct(editingProduct.value.id, productData);
    } else {
      await productStore.createProduct(productData);
    }
    closeModal();
  } catch (error) {
    console.error("Error saving product:", error);
  } finally {
    loading.value = false;
  }
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file type and size if needed
    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      alert("File size should not exceed 2MB");
      event.target.value = ""; // Clear the input
      return;
    }
    form.value.image = file;
  }
};

const confirmDelete = async (product) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await productStore.deleteProduct(product.id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
};

const closeModal = () => {
  showModal.value = false;
  editingProduct.value = null;
  form.value = {
    name: "",
    description: "",
    price: "",
    image: null,
  };
};
</script>
