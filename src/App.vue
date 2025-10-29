<template>
  <div class="bg-gray-950 text-white font-sans antialiased">
    <div class="relative min-h-screen overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div class="w-full h-full bg-[radial-gradient(circle_at_top_right,#0f4c75_0%,transparent_50%),radial-gradient(circle_at_bottom_left,#4f378b_0%,transparent_50%)]"></div>
      </div>

      <HeaderNav v-if="!componentError" />
      
      <!-- Fallback header if HeaderNav fails -->
      <div v-else class="relative z-10 bg-gray-900/70 backdrop-blur-sm border-b border-cyan-800/20 py-4">
        <div class="max-w-[1440px] mx-auto px-4 text-center">
          <h1 class="text-2xl font-bold text-cyan-500">Ticket Web App</h1>
        </div>
      </div>

      <main class="flex-1 relative z-10">
        <Suspense>
          <template #default>
            <RouterView v-slot="{ Component, route }">
              <component :is="Component" v-if="Component" :key="route.path" />
              <div v-else class="flex items-center justify-center min-h-screen">
                <div class="text-center">
                  <h2 class="text-xl text-cyan-500 mb-4">Welcome to Ticket Web App</h2>
                  <p class="text-gray-400">Loading content...</p>
                </div>
              </div>
            </RouterView>
          </template>
          <template #fallback>
            <div class="flex items-center justify-center min-h-screen">
              <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                <p class="text-gray-400">Loading application...</p>
              </div>
            </div>
          </template>
        </Suspense>
      </main>

      <footer class="relative z-10 bg-gray-900/70 backdrop-blur-sm mt-16 border-t border-cyan-800/20 py-4">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="text-sm text-gray-500 font-light tracking-wide">
            <p>© {{ new Date().getFullYear() }} Ticket Web App. All rights reserved.</p>
            <span class="text-cyan-500/70">LATEEF HABEEB</span>
          </div>
        </div>
      </footer>

      <ToastContainer v-if="!componentError" />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onErrorCaptured, ref } from 'vue'

const componentError = ref(false)

// Try to import components with error handling
let HeaderNav, ToastContainer, useToast

try {
  HeaderNav = (await import('./components/HeaderNav.vue')).default
  ToastContainer = (await import('./components/ToastContainer.vue')).default
  const toastModule = await import('./composables/useToast')
  useToast = toastModule.useToast
} catch (error) {
  console.error('Failed to load components:', error)
  componentError.value = true
}

// Debug logging for production
console.log('App.vue loaded, component error:', componentError.value)

onMounted(() => {
  console.log('App mounted successfully')
  
  if (!componentError.value && useToast) {
    try {
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
    } catch (err) {
      console.error('Failed to setup toast:', err)
    }
  }
})

onErrorCaptured((error, instance, info) => {
  console.error('Vue error captured:', error, info)
  componentError.value = true
  return false
})
</script>
