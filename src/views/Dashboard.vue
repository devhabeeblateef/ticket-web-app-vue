<template>
<section class="py-6 md:py-10">
    <div class="max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8">

    <div class="flex justify-between items-center pb-6 border-b border-cyan-800/50 mb-8">
        <h2 class="text-4xl font-extrabold 
                   bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            System Dashboard
        </h2>
        <div>
            <button @click="logout" class="px-5 py-2 text-red-400 border border-red-500 rounded-lg 
                                           hover:bg-red-500/10 transition duration-200 
                                           font-semibold shadow-md shadow-red-900/30">
                Logout
            </button>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

        <div class="p-6 rounded-xl border border-green-800/50 bg-gray-900/50 backdrop-blur-sm
                    shadow-xl shadow-green-900/30 transition duration-300 hover:shadow-green-700/50
                    border-l-4 border-green-500 hover:scale-[1.01] cursor-pointer">
            <h3 class="text-5xl font-extrabold text-green-400 mb-1 [text-shadow:0_0_5px_rgba(0,255,0,0.3)]">{{ totalCount }}</h3>
            <p class="text-gray-400 text-sm uppercase tracking-widest font-mono">Total tickets</p>
        </div>

        <div class="p-6 rounded-xl border border-amber-800/50 bg-gray-900/50 backdrop-blur-sm
                    shadow-xl shadow-amber-900/30 transition duration-300 hover:shadow-amber-700/50
                    border-l-4 border-amber-500 hover:scale-[1.01] cursor-pointer">
            <h3 class="text-5xl font-extrabold text-amber-400 mb-1 [text-shadow:0_0_5px_rgba(255,255,0,0.3)]">{{ openCount }}</h3>
            <p class="text-gray-400 text-sm uppercase tracking-widest font-mono">Open</p>
        </div>

        <div class="p-6 rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm
                    shadow-xl shadow-gray-900/30 transition duration-300 hover:shadow-gray-700/50
                    border-l-4 border-gray-500 hover:scale-[1.01] cursor-pointer">
            <h3 class="text-5xl font-extrabold text-gray-400 mb-1">{{ closedCount }}</h3>
            <p class="text-gray-400 text-sm uppercase tracking-widest font-mono">Closed</p>
        </div>
    </div>


    <div class="p-8 rounded-2xl border border-cyan-800/50 bg-gray-900/60 backdrop-blur-lg 
                shadow-2xl shadow-cyan-900/30">
        <h3 class="text-xl font-semibold mb-6 text-white border-b border-gray-700/50 pb-3">Quick Actions // Command Center</h3>
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            
            <router-link to="/tickets" class="w-full sm:w-auto inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg
                                            bg-gradient-to-r from-purple-600 to-cyan-500 text-white 
                                            shadow-lg shadow-cyan-500/30 transform transition duration-300 
                                            hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-400/40">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Create New Ticket
            </router-link>
            
            <router-link to="/tickets" class="text-cyan-400 hover:text-cyan-300 font-semibold transition duration-150 py-3 px-2 tracking-wider">
                View All Tickets →
            </router-link>
            
        </div>
    </div>

</div>
</section>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

// Reactivity trigger for localStorage updates
const ticketsUpdateTrigger = ref(0)

// Load tickets from localStorage on component mount
onMounted(() => {
  if (auth.loadTickets) {
    auth.loadTickets()
  }
  // Set up periodic refresh to catch changes from other components
  const interval = setInterval(() => {
    ticketsUpdateTrigger.value++
  }, 1000) // Update every second
  
  // Clean up on unmount
  return () => clearInterval(interval)
})

const tickets = computed(() => {
  // This dependency ensures the computed updates when we change tickets
  ticketsUpdateTrigger.value
  try {
    return JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
  } catch (e) {
    return []
  }
})

const totalCount = computed(() => tickets.value.length)
const openCount = computed(() => tickets.value.filter(t => t.status === 'open').length)
const closedCount = computed(() => tickets.value.filter(t => t.status === 'closed').length)

function logout() {
  auth.logout()
  if (typeof window !== 'undefined' && window.$toast) {
    window.$toast('Logged out successfully', 'info')
  }
  router.push('/auth/login')
}
</script>
