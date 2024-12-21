<!-- src/views/LoginPage.vue -->
<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link
          to="/register"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          create a new account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <LoginForms />
    </div>
  </div>
</template>

<script setup>
import LoginForms from "@/components/Forms/LoginForms.vue";
</script>
