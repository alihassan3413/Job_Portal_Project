<!-- src/components/Forms/LoginForm.vue -->
<template>
  <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div class="mt-1">
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <p v-if="errors.email" class="mt-2 text-sm text-red-600">
          {{ errors.email }}
        </p>
      </div>

      <!-- Password Input -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div class="mt-1">
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            autocomplete="current-password"
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <p v-if="errors.password" class="mt-2 text-sm text-red-600">
          {{ errors.password }}
        </p>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? "Signing in..." : "Sign in" }}
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

const router = useRouter();
const loading = ref(false);
const error = ref("");
const errors = reactive({
  email: "",
  password: "",
});

const form = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  // Reset errors
  error.value = "";
  errors.email = "";
  errors.password = "";

  loading.value = true;

  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: form.email,
      password: form.password,
    });

    localStorage.setItem("authToken", response.data.token);

    // Redirect to dashboard
    router.push("/seller/dashboard");
  } catch (err) {
    if (err.response?.data?.errors) {
      // Handle validation errors
      const validationErrors = err.response.data.errors;
      Object.keys(validationErrors).forEach((key) => {
        errors[key] = validationErrors[key][0];
      });
    } else {
      // Handle general error
      error.value =
        err.response?.data?.message || "An error occurred during sign in";
    }
  } finally {
    loading.value = false;
  }
};
</script>
