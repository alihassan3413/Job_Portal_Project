import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { API_BASE_URL } from "@/config/api";

export const useAuthStore = defineStore("auth", () => {
  // States
  const user = ref(null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const error = ref(null);

  const register = async (userData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      user.value = response.data.user;
      isAuthenticated.value = true;
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Registration Failed!";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    this.error = null;
  };

  // Return the store state and actions
  return {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    clearError,
  };
});
