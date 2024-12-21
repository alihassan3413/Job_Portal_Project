<template>
  <form
    @submit.prevent="handleSubmit"
    class="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md"
  >
    <!-- Alert Component for Errors -->
    <div
      v-if="store.error || formError"
      class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md"
    >
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-red-400"
            xmlns="http://www.w3.org/2000/svg"
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
          <p class="text-sm text-red-700">
            {{ store.error || formError }}
          </p>
        </div>
      </div>
    </div>

    <!-- Name Field -->
    <div class="space-y-1 mb-6">
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Full Name</label
      >
      <input
        id="name"
        v-model="formData.name"
        type="text"
        :class="[
          'w-full px-4 py-2 border rounded-md transition-colors duration-200',
          { 'border-red-500 bg-red-50': v$.name.$error },
          { 'border-gray-300 focus:border-blue-500': !v$.name.$error },
        ]"
        @focus="clearFieldError('name')"
      />
      <p v-if="v$.name.$error" class="text-sm text-red-600 mt-1">
        {{ v$.name.$errors[0].$message }}
      </p>
    </div>

    <!-- Email Field -->
    <div class="space-y-1 mb-6">
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email Address</label
      >
      <input
        id="email"
        v-model="formData.email"
        type="email"
        :class="[
          'w-full px-4 py-2 border rounded-md transition-colors duration-200',
          { 'border-red-500 bg-red-50': v$.email.$error },
          { 'border-gray-300 focus:border-blue-500': !v$.email.$error },
        ]"
        @focus="clearFieldError('email')"
      />
      <p v-if="v$.email.$error" class="text-sm text-red-600 mt-1">
        {{ v$.email.$errors[0].$message }}
      </p>
    </div>

    <!-- Password Field -->
    <div class="space-y-1 mb-6">
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <div class="relative">
        <input
          id="password"
          v-model="formData.password"
          :type="showPassword ? 'text' : 'password'"
          :class="[
            'w-full px-4 py-2 border rounded-md transition-colors duration-200',
            { 'border-red-500 bg-red-50': v$.password.$error },
            { 'border-gray-300 focus:border-blue-500': !v$.password.$error },
          ]"
          @focus="clearFieldError('password')"
        />
        <button
          type="button"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
          @click="showPassword = !showPassword"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              v-if="showPassword"
              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
            />
            <path v-else d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              v-else
              d="M2.458 12C3.732 16.057 7.522 19 12 19c4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7-4.478 0-8.268 2.943-9.542 7z"
            />
          </svg>
        </button>
      </div>
      <p v-if="v$.password.$error" class="text-sm text-red-600 mt-1">
        {{ v$.password.$errors[0].$message }}
      </p>
    </div>

    <!-- Password Confirmation Field -->
    <div class="space-y-1 mb-6">
      <label
        for="password_confirmation"
        class="block text-sm font-medium text-gray-700"
      >
        Confirm Password
      </label>
      <div class="relative">
        <input
          id="password_confirmation"
          v-model="formData.password_confirmation"
          :type="showPassword ? 'text' : 'password'"
          :class="[
            'w-full px-4 py-2 border rounded-md transition-colors duration-200',
            { 'border-red-500 bg-red-50': v$.password_confirmation.$error },
            {
              'border-gray-300 focus:border-blue-500':
                !v$.password_confirmation.$error,
            },
          ]"
          @focus="clearFieldError('password_confirmation')"
        />
      </div>
      <p
        v-if="v$.password_confirmation.$error"
        class="text-sm text-red-600 mt-1"
      >
        Passwords must match
      </p>
    </div>

    <!-- Role Selection -->
    <div class="space-y-1 mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Account Type</label
      >
      <div class="grid grid-cols-2 gap-4">
        <label
          class="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          :class="[
            formData.role === 'buyer'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200',
          ]"
        >
          <input
            type="radio"
            v-model="formData.role"
            value="buyer"
            class="sr-only"
          />
          <div class="flex items-center">
            <div
              class="w-4 h-4 border rounded-full mr-3"
              :class="[
                formData.role === 'buyer'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300',
              ]"
            ></div>
            <span
              class="text-sm font-medium"
              :class="[
                formData.role === 'buyer' ? 'text-blue-900' : 'text-gray-900',
              ]"
              >Buyer</span
            >
          </div>
        </label>

        <label
          class="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          :class="[
            formData.role === 'seller'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200',
          ]"
        >
          <input
            type="radio"
            v-model="formData.role"
            value="seller"
            class="sr-only"
          />
          <div class="flex items-center">
            <div
              class="w-4 h-4 border rounded-full mr-3"
              :class="[
                formData.role === 'seller'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300',
              ]"
            ></div>
            <span
              class="text-sm font-medium"
              :class="[
                formData.role === 'seller' ? 'text-blue-900' : 'text-gray-900',
              ]"
              >Seller</span
            >
          </div>
        </label>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="store.loading"
      class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        v-if="store.loading"
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ store.loading ? "Creating account..." : "Create Account" }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const formError = ref("");

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "buyer",
});

// Custom validator for password confirmation
const sameAsPassword = helpers.withMessage(
  "Passwords must match",
  (value) => value === formData.password
);

const rules = {
  name: {
    required: helpers.withMessage("Name is required", required),
  },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Please enter a valid email address", email),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: helpers.withMessage(
      "Password must be at least 8 characters long",
      minLength(8)
    ),
  },
  password_confirmation: {
    required: helpers.withMessage("Please confirm your password", required),
    sameAsPassword,
  },
  role: { required },
};

const v$ = useVuelidate(rules, formData);

const clearFieldError = (field) => {
  v$.value[field].$reset();
  formError.value = "";
  store.clearError?.();
};

const handleSubmit = async () => {
  formError.value = "";
  const result = await v$.value.$validate();

  if (!result) {
    formError.value = "Please correct the errors before submitting.";
    return;
  }

  try {
    await store.register(formData);
    router.push("seller/dashboard");
  } catch (error) {
    // Error is already handled by the store
    console.error("Registration failed:", error);
  }
};
</script>
