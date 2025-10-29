<template>
   <header class="sticky top-0 z-40 backdrop-blur-md bg-gray-900/50 border-b border-cyan-800/30 shadow-2xl shadow-cyan-900/10">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                
                <a class="text-2xl font-bold tracking-widest text-cyan-400 hover:text-cyan-300 transition duration-300" href="/landing">
                    <span class="inline-block text-3xl mr-1 leading-none">⚡</span>TicketApp
                </a>
                
                <!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-8 items-center">
                
                <a href="/landing" class="text-gray-300 hover:text-cyan-400 font-medium transition duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">
                    Home
                </a>
                    
                <a href="/auth/login" class="px-4 py-2 text-cyan-400 border border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition duration-200">
                    Login
                </a>
                    
                <a href="/auth/signup" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transform hover:scale-105 transition duration-300">
                        Get Started
                    </a>

                <a href="/dashboard" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300">
                        Dashboard
                    </a>

                     <a href="/tickets" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300">
                        Tickets
                    </a>
                </nav>
                
                <!-- Mobile Menu Button -->
                <button 
                    @click="toggleMobileNav" 
                    class="md:hidden p-2 rounded-lg text-cyan-400 border border-cyan-700 hover:bg-cyan-700/20 transition duration-200" 
                    aria-label="Toggle navigation" 
                    :aria-expanded="isMobileNavOpen"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path v-if="!isMobileNavOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Mobile Navigation Menu -->
            <nav 
                :class="[
                    'md:hidden border-t border-cyan-800/30 py-4 transition-all duration-300 ease-in-out',
                    isMobileNavOpen ? 'block opacity-100 max-h-96' : 'hidden opacity-0 max-h-0'
                ]"
            >
                <div class="flex flex-col space-y-4">
                    <router-link to="/landing" @click="closeMobileNav" class="text-gray-300 hover:text-cyan-400 font-medium transition duration-200 py-2 px-4 rounded-lg hover:bg-cyan-500/10">
                        Home
                    </router-link>
                    
                    <router-link to="/auth/login" @click="closeMobileNav" class="text-cyan-400 border border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition duration-200 py-2 px-4 text-center">
                        Login
                    </router-link>
                    
                    <router-link to="/auth/signup" @click="closeMobileNav" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300">
                        Get Started
                    </router-link>

                    <router-link to="/dashboard" @click="closeMobileNav" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300">
                        Dashboard
                    </router-link>

                    <router-link to="/tickets" @click="closeMobileNav" class="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl py-2 px-4 text-center transition duration-300">
                        Tickets
                    </router-link>
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
const isMobileNavOpen = ref(false)

const session = computed(() => auth.session)

function toggleMobileNav() {
  isMobileNavOpen.value = !isMobileNavOpen.value
}

function closeMobileNav() {
  isMobileNavOpen.value = false
}

function logout() {
  auth.logout()
  router.push('/')
  window.$toast('Logged out successfully', 'success')
}
</script>
