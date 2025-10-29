<template>
   <header class="sticky top-0 z-40 backdrop-blur-md bg-gray-900/50 border-b border-cyan-800/30 shadow-2xl shadow-cyan-900/10">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                
                <router-link to="/" class="text-2xl font-bold tracking-widest text-cyan-400 hover:text-cyan-300 transition duration-300">
                    <span class="inline-block text-3xl mr-1 leading-none">⚡</span>TicketApp
                </router-link>
                
                <!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-8 items-center">
                
                <router-link to="/" class="text-gray-300 hover:text-cyan-400 font-medium transition duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">
                    Home
                </router-link>
                    
                <router-link v-if="!session" to="/auth/login" class="px-4 py-2 text-cyan-400 border border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition duration-200">
                    Login
                </router-link>
                    
                <router-link v-if="!session" to="/auth/signup" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transform hover:scale-105 transition duration-300">
                        Get Started
                </router-link>

                <router-link v-if="session" to="/dashboard" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300">
                        Dashboard
                </router-link>

                <router-link v-if="session" to="/tickets" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300">
                        Tickets
                </router-link>

                <button v-if="session" @click="logout" class="px-4 py-2 text-red-400 border border-red-500 rounded-lg hover:bg-red-500/10 transition duration-200 cursor-pointer active:scale-95">
                    Logout
                </button>
                </nav>
                
                <!-- Mobile Menu Button -->
                <button @click="toggleMobileNav" class="md:hidden p-2 rounded-lg text-cyan-400 border border-cyan-700 hover:bg-cyan-700/20 transition duration-200" aria-label="Toggle navigation">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
            
            <!-- Mobile Navigation Menu -->
            <nav v-show="showMobileNav" class="md:hidden border-t border-cyan-800/30 py-4">
                <div class="flex flex-col space-y-4">
                    <router-link to="/" class="text-gray-300 hover:text-cyan-400 font-medium transition duration-200 py-2 px-4 rounded-lg hover:bg-cyan-500/10" @click="closeMobileNav">
                        Home
                    </router-link>
                    
                    <router-link v-if="!session" to="/auth/login" class="text-cyan-400 border border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition duration-200 py-2 px-4 text-center" @click="closeMobileNav">
                        Login
                    </router-link>
                    
                    <router-link v-if="!session" to="/auth/signup" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300" @click="closeMobileNav">
                        Get Started
                    </router-link>

                    <router-link v-if="session" to="/dashboard" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300" @click="closeMobileNav">
                        Dashboard
                    </router-link>

                    <router-link v-if="session" to="/tickets" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300" @click="closeMobileNav">
                        Tickets
                    </router-link>

                    <button v-if="session" @click="logout" class="text-red-400 border border-red-500 rounded-lg hover:bg-red-500/10 transition duration-200 py-2 px-4 text-center cursor-pointer active:scale-95">
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const showMobileNav = ref(false)

const session = computed(() => auth.session)

function logout() {
  console.log('Logout function called in HeaderNav.vue')
  try {
    auth.logout()
    console.log('Auth logout completed in HeaderNav')
    router.push('/')
    if (typeof window !== 'undefined' && window.$toast) {
      window.$toast('Logged out successfully', 'success')
    }
  } catch (error) {
    console.error('Error during logout in HeaderNav:', error)
  }
}

function toggleMobileNav() {
  showMobileNav.value = !showMobileNav.value
}

function closeMobileNav() {
  showMobileNav.value = false
}
</script>
