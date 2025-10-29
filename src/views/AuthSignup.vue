<template>
<div class="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-gray-950">

    <div class="w-full max-w-md p-8 sm:p-10 rounded-3xl border border-cyan-800/50 
                bg-gray-900/60 backdrop-blur-lg shadow-2xl shadow-cyan-900/50 
                text-white relative z-10">

        <h2 class="text-3xl font-extrabold text-center mb-8 
                   bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Activate Account Access
        </h2>
        
        <form @submit.prevent="registerUser" class="space-y-6">
            
            <label class="block">
                <span class="text-sm font-medium text-gray-400 mb-1 block">Name</span>
                <input type="text" v-model="name" required 
                    class="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                           bg-gray-800 text-white placeholder-gray-500 transition duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                    placeholder="Your Full Name">
            </label>
            
            <label class="block">
                <span class="text-sm font-medium text-gray-400 mb-1 block">Email Address</span>
                <input type="email" v-model="email" required 
                    class="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                           bg-gray-800 text-white placeholder-gray-500 transition duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                    placeholder="you@example.com">
            </label>
            
            <label class="block">
                <span class="text-sm font-medium text-gray-400 mb-1 block">Password</span>
                <input type="password" v-model="password" required minlength="6" 
                    class="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                           bg-gray-800 text-white placeholder-gray-500 transition duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                    placeholder="Must be at least 6 characters">
            </label>
            
            <div v-if="error" class="text-red-500 text-sm text-center">
                {{ error }}
            </div>
            
            <div v-if="success" class="text-green-500 text-sm text-center">
                {{ success }}
            </div>
            
            <div class="pt-4"> 
                <button class="w-full py-3 text-lg font-semibold tracking-wider rounded-xl 
                               bg-gradient-to-r from-purple-600 to-cyan-500 text-white 
                               shadow-lg shadow-cyan-500/30 transform transition duration-300 
                               hover:scale-[1.01] hover:shadow-xl hover:shadow-cyan-400/40" 
                        type="submit">
                    Deploy Account
                </button>
            </div>
        </form>
        
        <p class="text-center text-sm mt-8 text-gray-500">
            Already have access? 
            <router-link to="/auth/login" class="text-cyan-400 hover:text-cyan-300 font-semibold transition duration-150">Login to the Matrix</router-link>
        </p>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const router = useRouter()
const auth = useAuthStore()

function registerUser() {
  const users = JSON.parse(localStorage.getItem('fake_users') || '[]')
  if (!name.value || !email.value || !password.value) {
    error.value = 'Name, email and password are required'
    success.value = ''
    return
  }
  if (users.find(u => u.email === email.value)) {
    error.value = 'Email already registered'
    success.value = ''
    return
  }

  users.push({ name: name.value, email: email.value, password: password.value })
  localStorage.setItem('fake_users', JSON.stringify(users))
  
  // Log the user in immediately after successful signup
  auth.login(email.value)
  if (typeof window !== 'undefined' && window.$toast) {
    window.$toast('Account created successfully! Welcome to the dashboard.', 'success')
  }
  router.push('/dashboard')
}
</script>
