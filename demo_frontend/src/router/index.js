import { createRouter, createWebHistory } from "vue-router";
import RegisterPage from "@/views/RegisterPage.vue";
import DashboardLayout from "../components/DashBoardLayout.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProductsView from "../views/Seller/ProductsView.vue";

// Lazy-loaded components for dashboard
// const ProductsView = () => import("../views/Seller/ProductsView.vue");
const DashboardHome = () => import("../views/Seller/DashboardHome.vue"); // Ensure this component exists

const routes = [
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    meta: { requiresGuest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { requiresGuest: true },
  },
  {
    path: "/seller",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: { name: "SellerDashboard" }, // Redirect to SellerDashboard
      },
      {
        path: "dashboard",
        name: "SellerDashboard", // Define the SellerDashboard route
        component: DashboardHome, // Your dashboard component
        meta: { title: "Dashboard" },
      },
      {
        path: "products",
        name: "SellerProducts",
        component: ProductsView,
        meta: { title: "Products" },
      },
    ],
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("@/views/LoginPage.vue"),
  //   meta: { requiresGuest: true },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem("authToken");

    if (!isAuthenticated) {
      next({ name: "Login" });
      return;
    }
  }

  // Check if the route requires guest access
  if (to.meta.requiresGuest) {
    const isAuthenticated = localStorage.getItem("authToken");

    if (isAuthenticated) {
      next({ name: "SellerDashboard" });
      return;
    }
  }

  next();
});

export default router;
