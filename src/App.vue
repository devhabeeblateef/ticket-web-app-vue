<template>
  <div class="bg-gray-950 text-white font-sans antialiased">
    <div class="relative min-h-screen overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div class="w-full h-full bg-[radial-gradient(circle_at_top_right,#0f4c75_0%,transparent_50%),radial-gradient(circle_at_bottom_left,#4f378b_0%,transparent_50%)]"></div>
      </div>

      <HeaderNav v-if="headerNavLoaded" />

      <main class="flex-1">
        <RouterView v-slot="{ Component }">
          <component :is="Component" v-if="Component" />
          <div v-else class="flex items-center justify-center min-h-screen">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
              <p class="text-gray-400">Loading...</p>
            </div>
          </div>
        </RouterView>
      </main>

      <footer class="relative z-10 bg-gray-900/70 backdrop-blur-sm mt-16 border-t border-cyan-800/20 py-4">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="text-sm text-gray-500 font-light tracking-wide">
            <p>© {{ new Date().getFullYear() }} Ticket Web App. All rights reserved.</p>
            <span class="text-cyan-500/70">LATEEF HABEEB</span>
          </div>
        </div>
      </footer>

      <ToastContainer v-if="toastContainerLoaded" />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

// Lazy load components to handle potential import issues
const HeaderNav = ref(null)
const ToastContainer = ref(null)
const headerNavLoaded = ref(false)
const toastContainerLoaded = ref(false)

onMounted(async () => {
  try {
    // Dynamically import components
    const headerModule = await import('./components/HeaderNav.vue')
    HeaderNav.value = headerModule.default
    headerNavLoaded.value = true

    const toastModule = await import('./components/ToastContainer.vue')
    ToastContainer.value = toastModule.default
    toastContainerLoaded.value = true

    // Set up toast functionality
    const { useToast } = await import('./composables/useToast')
    const { success, error, warning, info, showToast } = useToast()

    // Global event for showing toasts - backward compatibility
    window.$toast = (message, type = 'success') => {
      switch (type) {
        case 'success':
          success(message)
          break
        case 'error':
          error(message)
          break
        case 'warning':
          warning(message)
          break
        case 'info':
          info(message)
          break
        default:
          showToast(message, type)
      }
    }

    // Also expose individual methods globally
    window.$toast.success = success
    window.$toast.error = error
    window.$toast.warning = warning
    window.$toast.info = info
  } catch (err) {
    console.error('Failed to load components:', err)
  }
})
</script>
