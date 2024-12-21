import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";
import { API_BASE_URL } from "@/config/api";

export const useProductStore = defineStore("products", () => {
  // States
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const currentProduct = ref(null);

  // Actions
  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_BASE_URL}/seller/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      products.value = response.data;
      console.log(products.value, "pro");

      console.log(response.data);

      error.value = null;
    } catch (err) {
      error.value = err.response?.data?.message || "Error fetching products";
    } finally {
      loading.value = false;
    }
  };

  const createProduct = async (productData) => {
    loading.value = true;
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);

      // Add image only if it exists
      if (productData.image instanceof File) {
        formData.append("image", productData.image);
      }

      const response = await axios.post(
        `${API_BASE_URL}/seller/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      products.value.push(response.data);
      error.value = null;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Error creating product";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateProduct = async (id, productData) => {
    loading.value = true;
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });
      formData.append("_method", "PUT");

      const response = await axios.post(
        `${API_BASE_URL}/seller/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const index = products.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.value[index] = response.data;
      }
      error.value = null;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Error updating product";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteProduct = async (id) => {
    loading.value = true;
    try {
      await axios.delete(`${API_BASE_URL}/seller/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      products.value = products.value.filter((p) => p.id !== id);
      error.value = null;
    } catch (err) {
      error.value = err.response?.data?.message || "Error deleting product";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Getters
  const getProductById = (id) => {
    return products.value.find((p) => p.id === id);
  };

  const totalProducts = computed(() => products.value.length);

  // Return everything
  return {
    products,
    loading,
    error,
    currentProduct,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    totalProducts,
  };
});
