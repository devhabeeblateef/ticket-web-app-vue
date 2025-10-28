<template>
  <div class="bg-gray-950 text-white font-sans antialiased">
  <div class="relative min-h-screen overflow-hidden">
  <div class="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
  <div class="w-full h-full bg-[radial-gradient(circle_at_top_right,#0f4c75_0%,transparent_50%),radial-gradient(circle_at_bottom_left,#4f378b_0%,transparent_50%)]"></div>
  </div>

  <HeaderNav />

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="relative z-10 bg-gray-900/70 backdrop-blur-sm mt-16 border-t border-cyan-800/20 py-4">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="text-sm text-gray-500 font-light tracking-wide">
              <p>© {{ new Date().getFullYear() }} Ticket Web App. All rights reserved.</p>  
              <span class="text-cyan-500/70">LATEEF HABEEB</span>
            </div>
        </div>
    </footer>

    <!-- Toast Container for notifications -->
    <ToastContainer />
  </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderNav from './components/HeaderNav.vue'
import ToastContainer from './components/ToastContainer.vue'
import { useToast } from './composables/useToast'

// Set up global toast functionality
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
</script>
