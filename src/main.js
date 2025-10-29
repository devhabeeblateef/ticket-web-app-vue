import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

console.log('Starting Vue app...')

try {
  const app = createApp(App)
  const pinia = createPinia()
  
  app.config.errorHandler = (err, instance, info) => {
    console.error('Global error handler:', err, info)
  }
  
  app.use(pinia)
  app.use(router)
  app.mount('#app')
  
  console.log('Vue app mounted successfully')
} catch (error) {
  console.error('Failed to initialize Vue app:', error)
  
  // Fallback content
  document.getElementById('app').innerHTML = `
    <div style="background: #0f172a; color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif;">
      <div style="text-align: center;">
        <h1 style="color: #06b6d4; margin-bottom: 1rem;">Ticket Web App</h1>
        <p style="color: #9ca3af;">Application failed to load. Please refresh the page.</p>
      </div>
    </div>
  `
}
