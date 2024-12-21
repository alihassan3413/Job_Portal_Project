<!-- src/components/Modal.vue -->
<template>
  <Transition name="modal">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        @click="close"
      ></div>

      <!-- Modal panel -->
      <div class="flex min-h-screen items-center justify-center p-4">
        <div
          class="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all"
          @click.stop
        >
          <!-- Header -->
          <div class="border-b border-gray-200 px-6 py-4">
            <div class="flex items-center justify-between">
              <slot name="header">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ title }}
                </h3>
              </slot>
              <button
                type="button"
                class="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @click="close"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 py-4">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="border-t border-gray-200 bg-gray-50 px-6 py-4"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}
</style>
