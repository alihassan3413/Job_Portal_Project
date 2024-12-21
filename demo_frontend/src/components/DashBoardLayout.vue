<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 transform"
      :class="{ '-translate-x-full': !sidebarOpen }"
    >
      <div class="p-6">
        <h2 class="text-2xl font-bold">Seller Dashboard</h2>
      </div>

      <nav class="mt-6">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
          :class="{ 'bg-gray-700 text-white': currentRoute === item.path }"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          {{ item.name }}
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="pl-64">
      <!-- Top Navigation -->
      <header class="bg-white shadow">
        <div class="flex justify-between items-center px-6 py-4">
          <!-- <button @click="toggleSidebar" class="md:hidden">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <h1 class="text-xl">ALo</h1>
          </button> -->

          <span class="text-gray-800">Welcome, Seller!</span>
          <div class="flex items-center justify-between">
            <button
              @click="logout"
              class="ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  HomeIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  CogIcon,
} from "@heroicons/vue/24/outline";

const sidebarOpen = ref(true);
const route = useRoute();
const router = useRouter();

const menuItems = [
  { name: "Dashboard", path: "/seller/dashboard", icon: HomeIcon },
  { name: "Products", path: "/seller/products", icon: ShoppingBagIcon },
  { name: "Analytics", path: "/seller/analytics", icon: ChartBarIcon },
  { name: "Settings", path: "/seller/settings", icon: CogIcon },
];

const currentRoute = computed(() => route.path);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const logout = async () => {
  localStorage.removeItem("authToken");
  await router.push("/login");
};
</script>
